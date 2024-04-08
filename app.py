from flask import Flask, render_template, jsonify

from flask import Flask

app = Flask(__name__)
JOBS = [{
    "id": 1,
    "title": "10 KVA Transformer",
    "Price": "Rs.80,000"
}, {
    "id": 2,
    "title": "20 KVA Transformer",
    "Price": "Rs.1,00,000"
}, {
    "id": 3,
    "title": "100 KVA Transformer",
    "Price": "Rs.1,50,000"
}]


@app.route('/')
def hello_world():
  return render_template('home.html', jobs=JOBS)


@app.route('/api/jobs')
def list_jobs():
  return jsonify(JOBS)


if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
