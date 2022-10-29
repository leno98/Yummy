// let ArrOfId=[]
// if(localStorage.getItem("idOfMeals") != null){
//     ArrOfId = JSON.parse(localStorage.getItem("idOfMeals"))
// } else{
//     ArrOfId=[]
// }


// 1) علشان يعرضها local storage بنجيب اخر حاجه اتحطت ف ال 
let choosedMealdId = []
if (localStorage.getItem("idOfChoosedMeal") != null) {
    ArrOfId = JSON.parse(localStorage.getItem("idOfChoosedMeal"))
} else {
    ArrOfId = []
}


// Lookup full meal details by id
let id = ArrOfId.slice(-1).toString()
async function getMealsData() {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    finalRes = await res.json()
    // console.log(finalRes.meals)
    diplayMealDetails()
}
getMealsData()


function diplayMealDetails() {
    //grt from api response which is as array of object, so we do (map()) to get data from object from  
    //objectلأي حاجه عايزنها من ال  mapفهنعمل  array of objectلأنها جاية ع هيئة  responseبنجيب الداتا من ال  
    mealName = (finalRes.meals.map((obj) => obj.strMeal)).toString()
    mealImg = (finalRes.meals.map((obj) => obj.strMealThumb)).toString()
    instructions = (finalRes.meals.map((obj) => obj.strInstructions)).toString()
    area = (finalRes.meals.map((obj) => obj.strArea)).toString()
    category = (finalRes.meals.map((obj) => obj.strCategory)).toString()
    tags = ((finalRes.meals.map((obj) => obj.strTags)).toString()).split(",", 50)
    youtube = (finalRes.meals.map((obj) => obj.strYoutube)).toString()
    source = (finalRes.meals.map((obj) => obj.strSource)).toString()


    $("#mealImg").attr("src", mealImg)
    $("#mealName").text(mealName)
    $("#instructions").text(instructions)
    $("#area").html(`<span class="fw-bold">Area :</span> ${area}</p>`)
    $("#category").html(`<span class="fw-bold">Category :</span> ${category}</p>`)
    $(".source").attr("href", source)
    $(".youtube").attr("href", youtube)
    

    tagsList = ""
        for (let i = 0; i < tags.length; i++) {
            tagsList += `<li class="my-3 mx-1 p-1 rounded">${tags[i]}</li>`
            $(".tags").html(tagsList)
        }


    arr = Object.entries(finalRes.meals)
    let ingrediants_arr = []
    let measure_arr = []
    for (let [key, value] of Object.entries(finalRes.meals[0])) {
        // console.log(`${key}: ${value}`);
        if (`${key}`.indexOf("strIngredient") === 0 && `${value}`.trim().length != 0) {
            ingrediants_arr.push(`${value}`)
        }

        if (`${key}`.indexOf("strMeasure") === 0 && `${value}`.trim().length != 0) {
            measure_arr.push(`${value}`)
        }
    }
    console.log(ingrediants_arr)
    console.log(measure_arr) 
    
    
    ingrediants_obj = func(ingrediants_arr,measure_arr)
    //converting two arrays to object(key=ingrediants_arr ,value=measure_arr)
    function func(ingrediants_arr, measure_arr){ 
        const obj = {};  
        ingrediants_arr.forEach((Curr_element, index) => { 
            obj[Curr_element] = measure_arr[index]}) 
            return obj; 
    }; 
    console.log(ingrediants_obj)
    ingrediants_list=``
    for (let [key, value] of Object.entries(ingrediants_obj)){
        ingrediants_list += `<li class="my-3 mx-1 p-1 rounded">${value} ${key}</li>`
        $(".ingredients").html(ingrediants_list)
    }
}
for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
    }