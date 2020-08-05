## About

VeExpress client(Angular)

## Prerequisites

    Windows:
    	install Node.js(node-v12.15.0-x64.msi), this package contains npm tool
    	install cnpm(run 'npm install -g cnpm --registry=https://registry.npm.taobao.org')
    	install Angular CLI(run 'cnpm install -g @angular/cli')

    VSCodeUserSetup:
    	Install VSCodeUserSetup(VSCodeUserSetup-x64-1.37.1.exe)
    	Repository : https://vscode.cdn.azure.cn/stable/f06011ac164ae4dc8e753a3fe7f9549844d15e35/VSCodeUserSetup-x64-1.37.1.exe

    Build/Run
        1.run 'cnpm install' in following directory
            .
            projects/galaxy
            projects/ng2-smart-table

        2.run 'ng serve --proxyConfig=proxy.conf.js --poll=200000'

        3.open your browser on 'http://localhost:4200/'

## Directory structure

    ./package.json  //Node.js specific metadata, including development tools dependencies
    node_modules    //contains the npm packages for the tools we need
    projects    //
    projects/galaxy
    projects/ng2-smart-table
    projects/VeExpress

## Installation

## Build Instructions

    1.For production
    	ng build --prod --base-ref='/client/' --deply-ref='/client/'
    2.For debug propose in .net
    	ng build --base-ref='/client/' --deply-ref='/client/'
    3.For Angular client debug propose, will use 192.168.68.128 server as default WebAPI
    	ng serve

## todo list
