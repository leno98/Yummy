//search by name
$(".searchName").keyup(function (e) {
    SnameValue = e.target.value
    smallName = SnameValue.toLowerCase()

    //if condition to make again display of mealDetails = none after clear search input
    if (smallName == "") {
        $(".display").empty()
        if($(".details").css("display") != ""){
            console.log("hi")
            $(".categories").css("display","flex")
            $(".details").css("display","none")
        }

    } else {
        mealDiv = ``
        async function getMealsData() {
            res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${smallName}`)
            finalRes = await res.json()
            displayMeals()
        }
        getMealsData()
    }
})

//search by letter
$(".searchLetter").keyup(function (e) {
    SnameLett = e.target.value
    if (SnameLett == "") {
        if($(".details").css("display") != ""){
            console.log("hi")
            $(".categories").css("display","flex")
            $(".details").css("display","none")
        }
    }

    var regex = /^[a-zA-Z]{1}$/
    var valid = regex.test(SnameLett)
    var small_letter 
    if (valid == true) {
        small_letter = SnameLett.toLowerCase()
        console.log(small_letter)
        mealDiv = ``
        async function getMealsData() {
            console.log(small_letter)
            res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${small_letter}`)
            finalRes = await res.json()
            displayMeals()
        }
        getMealsData()
    } else {
        $(".display").empty()
    }
})


function displayMeals() {
    arrOfMeals = finalRes.meals.map((obj) => obj.strMeal)
    arrOfMealImg = finalRes.meals.map((obj) => obj.strMealThumb)
    arrOfMealId = finalRes.meals.map((obj) => obj.idMeal)

    for (let i = 0; i < finalRes.meals.length; i++) {
        mealName = `${arrOfMeals[i]}`
        mealImg = `${arrOfMealImg[i]}`
        mealId = `${arrOfMealId[i]}`

        $("#mealName").text(mealName)
        $("#mealImg").attr("src", mealImg)
        mealDiv += `
                <div class="col-md-3 silicted-meal">
                <div class="cat-card d-flex position-relative rounded-2">
                    <img src="${mealImg}" id="mealImg" class="mw-100 rounded-2" custom-id="${mealId}" alt="">
                    <div class="hover-layer position-absolute w-100 h-100 d-flex align-items-center ps-2 rounded-2">
                        <h2 class="fw-light" id="mealName">${mealName}</h2>
                    </div>
                </div>
            </div>`
        $(".display").html(mealDiv)
    }
}


//when click on special meal display its data
$("#selected-meal").click(function(e){
    let choosedMealId= $(e.target).siblings().attr("custom-id")
    async function getMealsData() {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${choosedMealId}`)
        finalRes = await res.json()
        // console.log(finalRes)
        diplayMealDetails()
        $(".categories").css("display","none")
        $(".details").css("display","flex")
    }
    getMealsData()
})


function diplayMealDetails() {
    //grt from api response which is as array of object, so we do (map()) to get data from object from response 
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
    // console.log(ingrediants_arr)
    // console.log(measure_arr) 
    
    
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