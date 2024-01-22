<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function distributeCards($numPeople) {
    if (!is_numeric($numPeople) || $numPeople < 0) {
        die(json_encode(["error" => "Input value does not exist or value is invalid"]));
    }

    $suits = ['S', 'H', 'D', 'C'];
    $cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'X', 'J', 'Q', 'K'];

    foreach ($suits as $suit) {
        foreach ($cards as $value) {
            $deck[] = $suit . '-' . $value;
        }
    }

    shuffle($deck);

    $result = [];
    $cardIndex = 0;

    for ($i = 0; $i < $numPeople; $i++) {
        $personCards = [];
        for ($j = 0; $j < 52 / $numPeople; $j++) {
            $personCards[] = $deck[$cardIndex++] ?? '-';
        }
        $result[] = implode(',', $personCards);
    }

    //Method 2 : Each People Get At Least One Card

    // $deck_count = 52;
    // $COUNT = 0;
    // if($numPeople <= $deck_count){
    //     foreach ($deck as $key => $value) {
    //         $personCards[$COUNT++][] = $deck[$cardIndex++];
    //         if($COUNT == $numPeople){
    //             $COUNT = 0;
    //         }
    //     }
    //     foreach ($personCards as $value) {
    //         $result[] = implode(',', $value);
    //     }
    //     return $result;
    // }else{
    //     foreach ($deck as $key => $value) {
    //         $personCards[$key] = $deck[$key];
    //     }
    //     return $result =  $personCards;
    // }

    //Method 2 : Each People Get At Least One Card

    $result[] = implode(',', $personCards);

    return $result;
}

// Get number of people from the query parameter
$numPeople = isset($_GET['numPeople']) ? intval($_GET['numPeople']) : null;

// Call the function and return the result as JSON
echo json_encode(["cards" => distributeCards($numPeople)]);
?>