async function getMealsData() {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    finalRes = await res.json()
    // console.log(finalRes)
    displayCategories()
}
getMealsData()

let catDiv =``
function displayCategories(){
    arrOfCategory = finalRes.categories.map((obj) => obj.strCategory)               //get array of name of each category   [beef.chicken,...]
    arrOfImg = finalRes.categories.map((obj) => obj.strCategoryThumb)               //get array of images url
    arrId = finalRes.categories.map((obj) => obj.idCategory)                        //get array of id of each category  [1,2,3,..]
    arrCatDesc = finalRes.categories.map((obj) => obj.strCategoryDescription)
    

    for (let i = 0 ;i < finalRes.categories.length ;i++) {
        catName=`${arrOfCategory[i]}`
        catImg = `${arrOfImg[i]}`
        catId = `${arrId[i]}`
        catDesc = `${arrCatDesc[i]}`


        catDiv += `
            <div class="col-md-3">
                <div class="cat-card d-flex  position-relative rounded-2 " cat_id="${catId}" cat_name="${catName}">
                    <img src="${catImg}" id="catImg"   class="mw-100 rounded-2" alt="">
                    <div class="hover-layer position-absolute text-center w-100 h-100 rounded-2">
                        <h2 class="fw-light" id="catName">${catName}</h2>
                        <p id="cat_descreption" class="fw-bold">${catDesc}</p>
                    </div>
                </div>
            </div>`
        $(".inner-div").html(catDiv)
    }
}


//when click on special category dispaly its meals
$(".inner-div").click(function(e){
    choosedCat= $(e.target).parent().siblings().parent().attr("cat_name")

    async function getChoosedCat() {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${choosedCat}`)
        finalRes = await res.json()
        displayChoosedCat()
    }
    getChoosedCat()
})

function displayChoosedCat(){
    arrOfMealName = finalRes.meals.map((obj) => obj.strMeal)       //get array of name of each category   [beef.chicken,...]
    arrOfImg = finalRes.meals.map((obj) => obj.strMealThumb)       //get array of images url
    arrMealId = finalRes.meals.map((obj) => obj.idMeal)                //get array of id of each category  [1,2,3,..]
    
    catDiv=``
    for (let i = 0 ;i < finalRes.meals.length ;i++) {
        mealName=`${arrOfMealName[i]}`
        mealImg = `${arrOfImg[i]}`
        mealId = `${arrMealId[i]}`

        catDiv += `
            <div class="col-md-3">
                <div class="cat-card d-flex position-relative rounded-2">
                    <img src="${mealImg}" id="${mealId}" class="mw-100 rounded-2" alt="">
                    <div class="hover-layer position-absolute w-100 h-100 d-flex align-items-center justify-content-center ps-2 rounded-2">
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

    async function getChoosedCat() {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${choosedMeal}`)
        finalRes = await res.json()
        console.log(finalRes)
        if($(".categories").css("display") != ""){
            console.log("hi")
            $(".meal_details").css({"display" : "flex" , "padding-top" : "2rem" , "padding-bottom" : "4rem" })
            $(".categories").css("display" , "none")
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