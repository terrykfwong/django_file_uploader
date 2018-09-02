# django_file_uploader

Setup on Ubuntu 16
```
Clone the repo
cd django_file_uploader
wget https://repo.anaconda.com/archive/Anaconda3-5.2.0-Linux-x86_64.sh
chmod +x Anaconda3-5.2.0-Linux-x86_64.sh
./Anaconda3-5.2.0-Linux-x86_64.sh -b -p env3
env3/bin/conda install django=2.1
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs
cd web
npm install
```

Start the Django development server
```
cd django_file_uploader/portal
../env3/bin/python manage.py migrate
../env3/bin/python manage.py runserver
```

Start the webpack dev server
```
cd django_file_uploader/web
./node_modules/webpack-dev-server/bin/webpack-dev-server.js --mode=development
```

Open browser on http://localhost:8080/
