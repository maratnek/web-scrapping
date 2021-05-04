echo Create output folder
mkdir output
echo Start nightmare over xvfb-run 
#DEBUG=nightmare:*,electron:* xvfb-run --server-args="-screen 0 1280x2000x24" npm start
xvfb-run --server-args="-screen 0 1280x1000x24" npm start
