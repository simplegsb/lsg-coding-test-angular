# Usage

- Setup: `npm install`
- Run: `ng serve`
- Test: `ng test`

# Technical Overview

## Architecture Summary

This is a simple one-page angular app (no routing). Bootstrap (ng-bootstrap) is used for styling.

It contains two components: `AppComponent` is the main page and `CreateRestaurantModalComponent` is a modal with a form used to specify the name and hours of a new restaurant.

There is a single service: `ServerService` which is currently a 'mock' implementation of CRUD operations.

## Technical Justifications

I chose the 'mock' server design as I would assume that if the application was to be continued this would be handled by an actual server. For this reason I also made sure that methods of this service returned `Observable`s as an actual server would need to do the same.

I took the time to effectively convert the given restaurant format into an internal one that makes searching, creation, editing and localization easier. As a result I also had to write code that takes my internal format and prints it nicely. All up this code introduced more complexity than I would have liked. 

## Areas for improvement

The modal content could have been added to a separate page. In this case since I thought it was a relatively simple form and it was only for creation (and not viewing/editing etc.) I decided a modal would be enough. Since this is only a very simple app it also allowed me to avoid using routing. I generally prefer the simplest solution that meets requirements. To be honest the form ended up taking up more space than I had anticipated and when all the validation prompts are shown it makes the modal very tall. A modal may have been the wrong decision here after all.

In a proper project I would have spoken with the API developers to see if a better format for the data could be provided up-front so that I did not have to convert it.

## Areas for feedback

To be honest, most projects I have worked in have not asked for tests. I would like to know what you think of mine and how I could improve.
