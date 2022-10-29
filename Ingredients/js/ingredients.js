async function getMealsData() {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    finalRes = await res.json()
    // console.log(finalRes)
    displayArea()
}
getMealsData()

let catDiv =``
function displayArea(){
    arrOfIngredName = finalRes.meals.map((obj) => obj.strIngredient)
    arrOfIngredDesc = finalRes.meals.map((obj) => obj.strDescription)
    arrOfIngredId = finalRes.meals.map((obj) => obj.strIngredient)
    
    for (let i = 0 ;i < 20 ;i++) {
        IngName=`${arrOfIngredName[i]}`
        IngDesc=`${arrOfIngredDesc[i]}`
        IngId=`${arrOfIngredId[i]}`

        catDiv += `
                <div class="col-md-6 col-lg-3 my-3">
                    <div ingred-name="${IngName}" ingred-id="${IngId}" class="box_shadow shadow"> 
                        <div  class="shadow box_shadow area-card text-center rounded-2 m-2">
                            <i class="fa-solid fa-bowl-food text-success fa-3x"></i>
                            <h2 class="text-white fw-light pt-0" id="catName">${IngName}</h2>
                            <p class="text-white">${IngDesc}</p>
                        </div>
                    </div>    
                </div>`
        $(".inner-div").html(catDiv)
    }
}


//when click on special ingredient dispaly its meals
$(".special-area").click(function(e){
    chossedIngrd = $(e.target).parent().parent().attr("ingred-name")

    async function getChoosedCat() {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${chossedIngrd}`)
        finalRes = await res.json()
        console.log(finalRes)
        displayChoosedIng()
    }
    getChoosedCat()
})


function displayChoosedIng(){
    arrOfIngName = finalRes.meals.map((obj) => obj.strMeal)
    arrOfImg = finalRes.meals.map((obj) => obj.strMealThumb)
    arrMealId = finalRes.meals.map((obj) => obj.idMeal)
    
    catDiv=``
    for (let i = 0 ;i < finalRes.meals.length ;i++) {
        mealName=`${arrOfIngName[i]}`
        mealImg = `${arrOfImg[i]}`
        mealId = `${arrMealId[i]}`

        catDiv += `
            <div class="col-md-3">
                <div class="cat-card d-flex position-relative rounded-2">
                    <img src="${mealImg}" id="${mealId}" class="mw-100 rounded-2" alt="">
                    <div class="hover-layer position-absolute w-100 h-100 d-flex align-items-center text-center ps-2 rounded-2">
                        <h2 class="fw-light" id="mealName">${mealName}</h2>
                    </div>
                </div>
            </div>`
        $(".inner-div").html(catDiv)
    }
}


//when click on special meal dispaly its  details
$(".inner-div").click(function(e){
    choosedMeal= $(e.target).parent().siblings().attr("id")
    console.log(choosedMeal)

    async function getChoosedCat() {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${choosedMeal}`)
        finalRes = await res.json()
        // console.log(finalRes)
        if($(".special-area").css("display") != ""){
            $(".meal_details").css({"display" : "flex" , "padding-top" : "2rem" , "padding-bottom" : "4rem" })
            $(".special-area").css("display" , "none")
        }
        diplayMealDetails()
    }
    getChoosedCat()
})


function diplayMealDetails() {
    nameOFMeal = (finalRes.meals.map((obj) => obj.strMeal)).toString()
    mealImg = (finalRes.meals.map((obj) => obj.strMealThumb)).toString()
    instructions = (finalRes.meals.map((obj) => obj.strInstructions)).toString()
    area = (finalRes.meals.map((obj) => obj.strArea)).toString()
    category = (finalRes.meals.map((obj) => obj.strCategory)).toString()
    tags = ((finalRes.meals.map((obj) => obj.strTags)).toString()).split(",", 50)
    youtube = (finalRes.meals.map((obj) => obj.strYoutube)).toString()
    source = (finalRes.meals.map((obj) => obj.strSource)).toString()


    $("#mealImg").attr("src", mealImg)
    $("#name").text(nameOFMeal)
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
    
    
    ingrediants_obj = func(ingrediants_arr,measure_arr)
    //converting two arrays to object(key=ingrediants_arr ,value=measure_arr)
    function func(ingrediants_arr, measure_arr){ 
        const obj = {};  
        ingrediants_arr.forEach((Curr_element, index) => { 
            obj[Curr_element] = measure_arr[index]}) 
            return obj; 
    }; 
    // console.log(ingrediants_obj)
    ingrediants_list=``
    for (let [key, value] of Object.entries(ingrediants_obj)){
        ingrediants_list += `<li class="my-3 mx-1 p-1 rounded">${value} ${key}</li>`
        $(".ingredients").html(ingrediants_list)
    }
}