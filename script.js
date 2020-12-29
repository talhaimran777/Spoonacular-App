$(document).ready(function () {
  console.log('Jquery working fine!');
  $apiKey = 'e0ac941e876149b5ae2c81b702be0e55';

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
        $.each(recipes, function (i, recipe) {
          console.log(i, recipe);
        });
      },
    });
  });
});
