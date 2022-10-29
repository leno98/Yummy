async function getMealsData() {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    finalRes = await res.json()
    // console.log(finalRes.meals)
    displayRandomMeals()
}
getMealsData()

let ArrOfId = []
let mealDiv = ``
function displayRandomMeals() {
    //  1)واحد فيه اسامي الاكلات و التاني فيه الصور  array2 بحيث قسمنا الداتا اللي عيزنها ل .array of objects علشان نقدر نجيب الداتا لأنها طالعه ع شكل  map عملنا  
    arrOfMeals = finalRes.meals.map((obj) => obj.strMeal)
    arrOfMealImg = finalRes.meals.map((obj) => obj.strMealThumb)
    arrOfMealId = finalRes.meals.map((obj) => obj.idMeal)

    // 2)  الجايه respose بنفس عدد ال  meals لعرض ال  for loop عملت 
    for (let i = 0; i < finalRes.meals.length; i++) {
        mealName = `${arrOfMeals[i]}`
        mealImg = `${arrOfMealImg[i]}`
        mealId = `${arrOfMealId[i]}`

        // $("#mealName").text(mealName)
        // $("#mealImg").attr("src",mealImg)
        mealDiv += `
                <div class="col-md-3 silicted-meal">
                <div class="cat-card d-flex position-relative rounded-2">
                    <img src="${mealImg}" id="mealImg" class="mw-100 rounded-2" custom-id="${mealId}" alt="">
                    <div class="hover-layer position-absolute w-100 h-100 d-flex align-items-center ps-2 rounded-2">
                        <h2 class="fw-light" id="mealName">${mealName}</h2>
                    </div>
                </div>
            </div>`
        $(".row").html(mealDiv)

        // 3) to push id for every meal into localstorage at each iteration
        ArrOfId.push(mealId)
        localStorage.setItem("idOfMeals", JSON.stringify(ArrOfId))
    }
}

let choosedMealdId = []
$(".row").click(function (e) {
    // 1)  بتاعتها (mealDetails.html) ياخدني لل (meal)ع اي صورة ل click لما 
    location.href = "../mealDetails/mealDetails.html"

    // 2) واعرضها push هاخد اخر حاجه اتحطت ال هي اخر حاجه اتعملها (mealDetails.html ف ال)علشان هناك array بتاعها ف id هحط ال click الحاجه اللي هيعمل عليها 
    let choosedMeal = $(e.target).siblings().attr("custom-id")
    choosedMealdId.push(choosedMeal)
    localStorage.setItem("idOfChoosedMeal", JSON.stringify(choosedMealdId))
})

// $(".custom_navber_toggler").click(function(e){
//     let offsetEle =$(this).offset().left;
//     let movingPart = $(".moving-part").innerWidth()
//     if(offsetEle == 0){
//         console.log("inside")
//         $(".moving-part").animate({left:`-${movingPart}px`},1000)
//     }else{
//         // $(".moving-part").animate({left: "0px"},1000)
//         $(".moving-part").fadeOut(1000)
//         console.log("outside")
//     }
// })
let flag = 0

// $(".custom_navber_toggler").click(function(e){
// console.log(e)
//     $(".moving-part").toggle(1000)
// })

const button = document.getElementById('btn');

let elementClicked = false;
$(".moving-part").css({ "display": "none" })
$(".moving-part").css({ "display": "flex" })
button.addEventListener('click', function handleClick() {
    if (elementClicked) {
        console.log('show navbar');
        $(".moving-part").css({ "display": "flex" })

        elementClicked = false
    }
    else {
        console.log('disable navbar');
        $(".moving-part").css({ "display": "none" })
        elementClicked = true

    }


});