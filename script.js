$(document).ready(function () {
  $apiKey = '7042d34f284449d6aa14eee9f2614691';

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
    $('#spinner').hide();
    $('#spinner').removeClass('d-none');

    $ingredientsArray = $('#ingredients')
      .val()
      .split(',')
      .map((ingredient) => ingredient.trim());

    // Generate a query for fetching recipes by ingredients
    $ingredientsString = generateIngredientsString($ingredientsArray);

    //console.log($ingredientsArray.length);

    $query = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${$apiKey}&${$ingredientsString}&number=${$ingredientsArray.length}`;

    $('#spinner').show();
    $.ajax({
      type: 'GET',
      cache: false,
      url: `${$query}`,
      success: function (recipes) {
        $('#my-row').empty();

        $.each(recipes, function (i, recipe) {
          $queryForRecipe = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${$apiKey}&includeNutrition=false`;
          $.ajax({
            type: 'GET',
            cache: false,
            url: $queryForRecipe,
            success: function (singleRecipe) {
              $('#my-row').append(`
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
              <div class="card">
                <h5 class="card-title text-center mb-2">${
                  singleRecipe.title
                }</h5>
                <img
                  src=${singleRecipe.image}
                  class="card-img-top"
                  alt="..."
                  fluid
                />
                <div class="card-body">
                    <h5 class = "mb-3">${recipe.usedIngredientCount} / ${
                recipe.usedIngredientCount + recipe.missedIngredientCount
              } Ingredients</h5>
                    <div class="scroll mb-2" style="height:200px; overflow-y: scroll;">
                        <p style="line-height: 20px;">${
                          singleRecipe.summary
                        }</p>
                    </div>
    
                    <button class="btn btn-primary">View</button>
                </div>
              </div>
            </div> 
              `);
            },

            complete: function () {
              $('#spinner').hide();
              $('#spinner').addClass('d-none');
            },
          });
        });
      },
    });
  });
});
