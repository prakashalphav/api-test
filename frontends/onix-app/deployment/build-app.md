# cd to first
cd  ./frontends/onix-app

# first time setup
npm install

# Build commmands in the below order
npm run build.client
npm run build.server


# Will be then Built into below Folders
/dist  --> for public access 
/server --> for internal server own access (pm2)


# make sure below Cloudflare features is disabled else there is weird error :
 
Email Obfuscation
Rocket Loader
Server Side Excludes (SSE)
Mirage
HTML , JS and CSS ,Minification   (including Create a page rule and set Auto Minify: Off )
Automatic HTTPS Rewrites