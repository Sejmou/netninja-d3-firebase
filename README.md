# Learning D3.js
This repo contains "my version" of the D3.js code presented in the [Udemy course](https://www.udemy.com/course/build-data-uis-with-d3-firebase) by The Net Ninja (Shaun Pelling) on Udemy (or, rather the parts of it I look at in detail).

The main difference to the code presented in the lectures is that I chose to use [TypeScript](https://www.typescriptlang.org/) instead of plain JavaScript, with [Vite](https://vitejs.dev/) as the build tool. I started out with Vite's "Vanilla TS" template (find details on Vite templates [here](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) and then installed `d3` and `@types/d3`.

## Installation
To make the code run on your machine, make sure `NodeJS` is installed. 

I chose to use `yarn` instead of `npm`, so you might need to install it too with `npm i -g yarn`.

Once that is done, run `yarn` to install the project's dependencies (effectively only TypeScript and d3).

Then, run `yarn dev` and the project should become available via [localhost on port 5173](http://localhost:5173/).

## Branches
I've organized the code into separate branches related to the different chapters of the course.