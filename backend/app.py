from flask import Flask

# Create a Flask app instance
app = Flask(__name__)

# Define a route for the root URL
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    # Run the app on the local server at port 5000
    app.run(debug=True)
