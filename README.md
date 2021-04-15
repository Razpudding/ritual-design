# ritual-design
A tool I'm building to help an artist design rituals

## Useful Resources
- Better way to use CSS to create geometrical shapes on [freecodecamp](https://www.freecodecamp.org/news/css-shapes-explained-how-to-draw-a-circle-triangle-and-more-using-pure-css/)
- [CouchDB](https://docs.couchdb.org/en/stable/intro/index.html) as a lightweight db solution
- [JSONbin.io](https://jsonbin.io/) as a lightweight db solution. [Update json through API](https://jsonbin.io/api-reference/v3/bins/update).
- Proper backend:
    + Start with json objects in server memory (let's skip this and go straight to mongo)
    + Set up MongoDB as a database
    + Transform data mutation logic to MongoDB
- [Implementing a Finite State Machine](https://codechips.me/svelte-and-robot-fsm/). Might be helpful if the UI gets more complex.
- [Rendering html to image options](https://stackoverflow.com/questions/10721884/render-html-to-an-image)
- [Scaling collection of html elements using css scale](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale())

## Svelte Resources
- [Cheatsheet](https://sveltesociety.dev/cheatsheet/)
- [Components](https://sveltesociety.dev/components/)
- [Blog](https://svelte.dev/blog)
- [Tutorial](https://svelte.dev/tutorial/basics)
- [Examples](https://svelte.dev/examples#7guis-crud)
- [Recipes](https://svelte-recipes.netlify.app/design-patterns/)
- [REPL sandbox](https://svelte.dev/repl/hello-world?version=3.35.0)
- [Material components 1](https://sveltematerialui.com/demo/drawer)
- [Material components 2](https://docs.svelteit.dev/cards)
- [Svelte-mongodb-express setup](https://www.youtube.com/watch?v=X6J41F2DadQ&ab_channel=EstebanCodes)

## Saving data

### Functionality
You can save the current state of the design you're working on. This means creating a copy of the slot and shape data.

- Save button
    + Dumps slot and shape data to local mem/db
    + Checks if current save should be overwritten or new save created
- Load button
    + Allows user to select a previously saved design
- Sidebar drawer with saved designs
    + Vertical scroll through images of saved designs (just text at first)
    + Clicking/mouseover on one shows a bigger image of the design
    + Selecting one gives option to load (if current state is unsaved ask if it should be)
    + Loading the design gets the data from mem/db and rerenders the content screen
- Maybe save and load btn should be in the same sidebar?

### Data Structure
Some options for reflecting the data of designs
*Flat*
Every type of data entity gets its own collection. Lots of boilerplate but easily maintained and expanded. Would make queries light but also manifold.

- Users (1..* Rituals)
- Rituals (1..* Designs): Separate collections of design
- Design (1 Ritual): Collection of elements
- Element (1 Design): Data of element (type, text, color, etc.)

*Nested*
All is stored in the Design collection in a nested structure. Not sure if this is supported by MongoDB. Queries could get a bit heavy but they'll be far and far between.

Design object
``` json
{
    userId,
    ritualId,
    data: {
        elements: [{
            type: 'rectangle',
            location: [24,42],
            text: 'History',
            color
        }],
        title,
        centerText
    }
}
```

*Stringified*
The bulk of information (elements) is codified in a string. More efficient than nesting but updating the data might be error prone. A custom parser is necessary client-side but shouldn't be too difficult. Don't know what the max string size is for a mongo doc property.

Design Object
``` json
{
    userId,
    ritualId,
    data: "el:{ty:re,lo:[24,42],te:'History'}"
    title,
    centerText
}
```
