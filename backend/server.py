import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs

user_sessions = {}  # Simple in-memory session store

class RequestHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/api/signup':
            self.handle_signup()
        elif self.path == '/api/signin':
            self.handle_signin()
        elif self.path == '/api/help':
            self.handle_help()
        elif self.path == '/api/borrowed/add':
            self.handle_add_borrowed_book()
        elif self.path == '/api/logout':
            self.handle_logout()
        else:
            self.send_error(404, 'Not Found')

    def do_GET(self):
        if self.path.startswith('/api/borrowed'):
            self.handle_borrowed_books()
        elif self.path.startswith('/api/purchased'):
            self.handle_purchased_books()
        else:
            self.send_error(404, 'Not Found')

    def send_response_json(self, data, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def get_user_id(self, username):
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT id FROM users WHERE username = ?', (username,))
        user_id = c.fetchone()
        conn.close()
        return user_id[0] if user_id else None

    def handle_signup(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode()
        data = json.loads(post_data)
        username = data.get('username')
        password = data.get('password')

        conn = sqlite3.connect('database.db')
        c = conn.cursor()

        c.execute('SELECT * FROM users WHERE username = ?', (username,))
        if c.fetchone():
            conn.close()
            self.send_response_json({'success': False, 'message': 'Username already exists'}, 400)
            return

        c.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        conn.close()
        self.send_response_json({'success': True, 'message': 'User registered successfully'})

    def handle_signin(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode()
        data = json.loads(post_data)
        username = data.get('username')
        password = data.get('password')

        conn = sqlite3.connect('database.db')
        c = conn.cursor()

        c.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        if c.fetchone():
            user_sessions[username] = True  # Simple session management
            conn.close()
            self.send_response_json({'success': True, 'message': 'Sign-in successful'})
        else:
            conn.close()
            self.send_response_json({'success': False, 'message': 'Invalid username or password'}, 401)

    def handle_logout(self):
        # Here we clear the user session
        user_sessions.clear()
        self.send_response_json({'success': True, 'message': 'Logged out successfully'})

    def handle_borrowed_books(self):
        query_components = parse_qs(urlparse(self.path).query)
        username = query_components.get('username', [None])[0]
        user_id = self.get_user_id(username)

        if not user_id:
            self.send_response_json({'success': False, 'message': 'User not found'}, 404)
            return

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT title, genre, borrowed_date, due_date FROM borrowed_books WHERE user_id = ?', (user_id,))
        books = c.fetchall()
        conn.close()
        
        self.send_response_json([{'title': book[0], 'genre': book[1], 'borrowed_date': book[2], 'due_date': book[3]} for book in books])

    def handle_purchased_books(self):
        query_components = parse_qs(urlparse(self.path).query)
        username = query_components.get('username', [None])[0]
        user_id = self.get_user_id(username)

        if not user_id:
            self.send_response_json({'success': False, 'message': 'User not found'}, 404)
            return

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT title, genre, purchased_date FROM purchased_books WHERE user_id = ?', (user_id,))
        books = c.fetchall()
        conn.close()
        
        self.send_response_json([{'title': book[0], 'genre': book[1], 'purchased_date': book[2]} for book in books])

    def handle_help(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode()
        data = json.loads(post_data)
        message = data.get('message')
        
        # Normally, you would store this message or send it via email
        print('Help request received:', message)
        
        self.send_response_json({'success': True, 'message': 'Help request sent!'})

    def handle_add_borrowed_book(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode()
        data = json.loads(post_data)
        username = data.get('username')
        title = data.get('title')
        genre = data.get('genre')
        borrowed_date = data.get('borrowed_date')
        due_date = data.get('due_date')
        
        user_id = self.get_user_id(username)
        if not user_id:
            self.send_response_json({'success': False, 'message': 'User not found'}, 404)
            return

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('INSERT INTO borrowed_books (user_id, title, genre, borrowed_date, due_date) VALUES (?, ?, ?, ?, ?)', 
                  (user_id, title, genre, borrowed_date, due_date))
        conn.commit()
        conn.close()
        self.send_response_json({'success': True, 'message': 'Borrowed book added successfully'})

def run(server_class=HTTPServer, handler_class=RequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()



