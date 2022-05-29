# SCA Dinos Client

## Run on Local Computer

### MacOS

1. Install [Docker Desktop on MacOS](https://docs.docker.com/desktop/mac/install/).
2. Clone repository to local drive `git clone git@bitbucket.org:scaleo-team/dinos-client.git`
3. Open Terminal.
4. Go to working directory.
5. Run console command `make local-up`
6. Add host `127.0.0.1 scaleo-client.loc` to `/etc/hosts`
7. Open URL in browser [http://scaleo-client.loc:8888](http://scaleo-client.loc:8888)

### MacOS Without Docker (Apple M1 Processors)

1. Install node (LTS version) https://nodejs.org/en/download/
2. Clone repository to local drive `git clone git@bitbucket.org:scaleo-team/dinos-client.git`
3. Open Terminal.
4. Go to working directory.
5. Install Angular Cli global `sudo npm install -g @angular/cli@13.2.1`
6. Install Nx Cli global `sudo npm install -g nx`
7. Install dependencies `npm install --force`
8. Add host `127.0.0.1 scaleo-client.loc` to `/etc/hosts`
9. Run console command `ng serve --port=8888 --host=scaleo-client.loc`
10. Open URL in browser [http://scaleo-client.loc:8888](http://scaleo-client.loc:8888)


### Remove from Local Computer

1. Open Terminal
2. Go to working directory
3. Run console command `make local-down` to stop all docker containers
4. Delete project folder from local drive

## Useful Commands

`make local-up` - run Scaleo Client

`make local-down` - stop Scaleo Client

`make local-build` - build Scaleo Client docker images

`make local-build-dist` - build Scaleo Client docker images

`make local-serve` - Angular Live Development Server on 0.0.0.0:9999

---
