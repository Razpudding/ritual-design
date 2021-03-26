# ritual-design
A tool I'm building to help an artist design rituals

## Resources
- Better way to use CSS to create geometrical shapes on [freecodecamp](https://www.freecodecamp.org/news/css-shapes-explained-how-to-draw-a-circle-triangle-and-more-using-pure-css/)
- [CouchDB](https://docs.couchdb.org/en/stable/intro/index.html) as a lightweight db solution
- [JSONbin.io](https://jsonbin.io/) as a lightweight db solution. [Update json through API](https://jsonbin.io/api-reference/v3/bins/update).
- Proper backend:
    + Start with json objects in server memory
    + Set up MongoDB as a database
    + Transform data mutation logic to MongoDB

## Data structure
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
