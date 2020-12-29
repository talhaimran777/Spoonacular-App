$(document).ready(function () {
  $apiKey = '17b4568a870a4305bc4cb0ec3cfb70ba';

  function generateIngredientsString($ingredientsArray) {
    $query = 'ingredients=';

    $.each($ingredientsArray, function (i, ingredient) {
      if (i === 0) {
        $query += ingredient + ',';
      } else if (i === $ingredientsArray.length - 1) {
        $query += '+' + ingredient;
      } else {
        $query += '+' + ingredient + ',';
      }
    });
    return $query;
  }

  $('#search-form').click(function () {
    // https://api.spoonacular.com/recipes/findByIngredients?apiKey=e0ac941e876149b5ae2c81b702be0e55&ingredients=apples,+sugar&number=2
    $ingredientsArray = $('#ingredients')
      .val()
      .split(',')
      .map((ingredient) => ingredient.trim());

    // Generate a query for fetching recipes by ingredients
    $ingredientsString = generateIngredientsString($ingredientsArray);

    //console.log($ingredientsArray.length);

    $query = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${$apiKey}&${$ingredientsString}&number=${$ingredientsArray.length}`;

    $.ajax({
      type: 'GET',
      url: `${$query}`,
      success: function (recipes) {
        $('#my-row').empty();
        $.each(recipes, function (i, recipe) {
          $queryForRecipe = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${$apiKey}&includeNutrition=false`;

          $.ajax({
            type: 'GET',
            url: $queryForRecipe,
            success: function (recipe) {
              //   <div class="col-md-5">
              //       <div class="card" style="width: 18rem;">
              //           <img src="${recipe.image}" class="card-img-top" alt="..." />
              //           <div class="card-body">
              //           <h5 class="card-title">${recipe.title}</h5>
              //           <p class="card-text">
              //               ${recipe.summary}
              //           </p>
              //           <a href="#" class="btn btn-primary">View</a>
              //           </div>
              //       </div>
              //   </div>
              $('#my-row').append(`
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="card">
                <h5 class="card-title text-center mb-2">${recipe.title}</h5>
                <img
                  src=${recipe.image}
                  class="card-img-top"
                  alt="..."
                  fluid
                />
                <div class="card-body">
                    <div class="scroll mb-2" style="height:200px; overflow-y: scroll;">
                        <p style="line-height: 20px;">${recipe.summary}</p>
                      </div>
    
                      <button class="btn btn-primary">View</button>
                </div>
              </div>
            </div> 
              `);
            },
          });
        });
      },
    });
  });
});
