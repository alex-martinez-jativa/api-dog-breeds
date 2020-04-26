# DOG BREEDS API

<p>Public API with information about dog breeds</p>

<a href="https://api-dog-breeds.herokuapp.com">https://api-dog-breeds.herokuapp.com/api/</a>

## Endpoints

<table>
    <tr>
        <th>HTTP methods</th>
        <th>URI path</th>
        <th>Description</th>
        <th>Options</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/dogs</td>
        <td>Retrieve all dogs on JSON format</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/dog/:id</td>
        <td>Retrieve dog by id on JSON format</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/dogs/:breedGroup</td>
        <td>Retrieve all dogs matching with breed group on JSON format
        </td>
        <td>companion, herding, hound, hybrid, mixed, sporting, terrier, working</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/search</td>
        <td>Retrieve all dogs that matching with the query string on JSON format</td>
    </tr>
</table>

## JSON response format

```json
{
  "breedName": "spanish mastiff",
  "image": "https://cdn1-www.dogtime.com/assets/uploads/2020/01/spanish-mastiff-dog-breed-pictures-cover-650x368.jpg",
  "description": "The Spanish Mastiff is a purebred working dog with an old history of serving as a guardians for sheep and livestock. Protective, loving, and calm, these gentle giants have become popular guard dogs and family pets alike.",
  "dogInfo": [
    {
      "height": "26 to 35 inches"
    },
    {
      "weight": "140 to 220 pounds"
    },
    {
      "life": "10 to 12 years"
    },
    {
      "breedGroup": "working dogs"
    }
  ],
  "id": "5ea2ffe312007ad550f1ceec"
}
```

## Request examples

```url
https://api-dog-breeds.herokuapp.com/api/dogs/working

https://api-dog-breeds.herokuapp.com/api/dogs

https://api-dog-breeds.herokuapp.com/api/dog/5ea2ffe312007ad550f1ceec

https://api-dog-breeds.herokuapp.com/api/search?q=american
```

### Author
<p>Alex Martínez Játiva</p>