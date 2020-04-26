
(async() => {

    const response = await fetch('https://dogtime.com/dog-breeds/profiles/')
    const html = await response.text()
    const data = new DOMParser().parseFromString(html, 'text/html')
    
    const dogs = data.querySelectorAll('.list-item')
    let id = 1
    const results = []

    for(const dog of dogs) {

        let element = {}

        const image = dog.querySelector('.list-item-breed-img').src
        const name = dog.querySelector('.list-item-title').innerText
        id++
        element.id = id.toString()
        element.breedName = name.toLowerCase()
        element.image = image
        const dogName = setName(name)

        

        const response2 = await fetch(`https://dogtime.com/dog-breeds/${dogName}`)
        const html2 = await response2.text()
        const data2 = new DOMParser().parseFromString(html2, 'text/html')

        const description = data2.querySelector('.breeds-single-content p').innerText
        element.description = description

        let dataHeight = data2.querySelectorAll('.breed-vital-stats-wrapper')[0].children[1].innerText
        let height = dataHeight.split(' ')
        height[0] = height[0].replace('Height:', '')
        height = height.join(' ')

        let dataWeight = data2.querySelectorAll('.breed-vital-stats-wrapper')[0].children[2].innerText
        let weight = dataWeight.split(' ')
        weight[0] = weight[0].replace('Weight:', '')
        weight = weight.join(' ')

        let dataLife = data2.querySelectorAll('.breed-vital-stats-wrapper')[0].children[3].innerText
        let life = dataLife.split(' ')
        life[0] = life[0].replace('Life', '')
        life[1] = life[1].replace('Span:', '')
        life = life.join(' ')

        let dataBreed = data2.querySelectorAll('.breed-vital-stats-wrapper')[0].children[0].innerText
        let breed = dataBreed.split(' ')
        breed[0] = breed[0].replace('Dog', '')
        breed[1] = breed[1].replace('Breed', '')
        breed[2] = breed[2].replace('Group:', '')
        breed = breed.join(' ')

        element.dogInfo = [
            {height: height.trim().toLowerCase()},
            {weight: weight.trim().toLowerCase()},
            {life: life.trim().toLowerCase()},
            {breedGroup: breed.trim().toLowerCase()}
        ]

        
    results.push(element) 
    }
    
    console.log(JSON.stringify(results))
    
})()



function setName(name) {
    let n = name.split(' ')
    let nameString = ''
    for(let j=0; j < n.length; j++){
        nameString += n[j] + '-'
    }
    if(nameString.lastIndexOf('-') !== -1){
        nameString = nameString.slice(0,-1)
    }
    var index = nameString.indexOf("’")

    if(index !== -1){
        nameString = nameString.replace("’", '')
    }

    if(nameString === 'Korean-Jindo-Dog'){
        nameString = 'jindo'
    }
    if(nameString === 'Xoloitzcuintli'){
        nameString = 'xoloitzuintli'
    }

    return nameString.toLowerCase()
}
