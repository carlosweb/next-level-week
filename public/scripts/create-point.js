
const populateUfs = function() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => res.json() )
    .then( states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome} </option>`
        }
    }) 
}
populateUfs()

function getCiteis(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `
    citySelect.innerHTML = "" 
    citySelect.disabled = true

    fetch(url)
    .then( (res) => res.json() )
    .then( cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome} </option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCiteis)

//items de coletas
const itemsToCollect = document.querySelectorAll('.items-grid li')
itemsToCollect.forEach(item => {
    item.addEventListener("click", handleSelectedItem)
})

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        return item === itemId
    })

    //verificação do seleçao
    if(alreadySelected >= 0) {
        const filredItems= selectedItems.filter (item => {
            const itemDifferent = item != itemId
            return itemDifferent
        })
        selectedItems = filredItems
    }else {// adicionado na seleção
        selectedItems.push(itemId)
    }

    //atualizar 
    collectedItems.value = selectedItems
}

