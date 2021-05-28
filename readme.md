# Tonys Tacos Food Ordering App

This is an app I am building for the [Tony's Tacos](https://www.tonystaco.com/) restaurants. I am writing this with [React Native](https://github.com/facebook/react-native "react-native") and [Expo CLI](https://github.com/expo/expo-cli "expo-cli"). More coming soon.

You can also check out my other project: [MLB database analysis site](https://daniel.courtneyco.com/ "my-website")

## Video Demos

---

<table style="text-align:center;">
    <tr>
        <td>
            <h3>Authentication</h3>
            <video width="200" controls src="https://daniel.courtneyco.com/TonysTacos/auth.mov">
                video not available.
            </video>
        </td>
        <td>
        <h3>Menu & Food</h3>
            <video width="200" controls src="https://daniel.courtneyco.com/TonysTacos/food.mov">
                video not available.
            </video>
        </td>
    </tr>
    <tr>
        <td>
        <h3>Account Info</h3>
            <video width="200" controls src="https://daniel.courtneyco.com/TonysTacos/account.mov">
                video not available.
            </video>
        <td>
        <h3>Cart</h3>
            <video width="200"controls src="https://daniel.courtneyco.com/TonysTacos/cart.mov">
                video not available.
            </video>
        </td>
    </tr>
</table>

## Features

---

### Login/Register Screen

Data is authenticated via Firebase and registered accounts are written to Firebase database.

<ul>
    <li>Firebase authentication</li>
    <li>user field input verification</li>
    <li>toast messages upon user errors</li>
    <li>reset password via Firebase</li>
</ul>

### Home Screen

Data is collected realtime from Firebase database.

<ul>
    <li>carousel of announcements</li>
    <li>info reel of limited time offereing</li>
    <li>info reel of popular items (currently the same as limited time offering)</li>
</ul>

### Menu Screen

Data is collected realtime from Firebase database.

<ul>
    <li>list of all offerings and price if applicaple (i.e. some items need a size chosen before price can be given)</li>
    <li>offerings can be filtered using category selector on top of screen</li>
    <li>tap food item to navigate to food screen with selected food's data</li>
</ul>

### Account Screen

Data is collected from Firebase user and Firebase realtime database.

<ul>
    <li>sign out of account which sends user back to login/register screen</li>
    <li>view user profile's information (name, email, phone number)</li>
    <li>tap profile field to go to edit info screen which dynamically changes based on which field you tapped</li>
</ul>

### Food Screen

Data is collected through navigation props when item is selected in menu screen.

<ul>
    <li>create order item to add to cart</li>
    <li>if image is present for item in database then it will be displayed, otherwise, a taco icon will be displayed</li>
    <li>food item name, description, and if applicable modifiers and necessary choices will be shown</li>
    <li>adjust quantity, make necessary choice if available, add modifiers if available, item total adjusted realtime</li>
    <li>add order item to shopping cart</li>
</ul>

### Cart Screen

Cart data is distributed among other screens via React Context/Provider. Cart icon on other screens will display number of items in cart if not empty.

<ul>
    <li>if cart is empty then no option to order will be available</li>
    <li>each order item, quantity, total, modifiers (some modifiers will display their shorter description as some need to be explained to the user but not the chefs)</li>
    <li>tap on an order item to bring it back to the food screen where your modifiers will be remembered so you can edit your order (tap X in upper-left corner of this food screen to delete from cart)</li>
    <li>quantity of items and subtotal is displayed at bottom</li>
    <li>on tapping order the view slides up presenting sales tax and total price of the order with a Finish & Pay button</li>
    <li>tap Finish & Pay button to be prompted with alert with your user info and confirm order, on confirmation the order will be written to the Firebase database and your cart will be emptied</li>
</ul>

## Screenshots

---

<table style="text-align:center;">
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/signIn.png" alt="mexBowl" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/register.png" alt="chickenMango" width="300"/>
        </td>
    </tr>
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/forgotPass.png" alt="mexBowl" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/homePage.png" alt="chickenMango" width="300"/>
        </td>
    </tr>
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/homePage2.png" alt="home1" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/menu.png" alt="home2" width="300"/>
        </td>
    </tr>
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/menu2.png" alt="menu2" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/account.png" alt="menu2" width="300"/>
        </td>
    </tr>
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/editInfo.png" alt="mexBowl" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/chickenMango.png" alt="chickenMango" width="300"/>
        </td>
    </tr>
    <tr>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/mexBowl.png" alt="mexBowl" width="300"/>
        </td>
        <td>
        <img src="https://daniel.courtneyco.com/TonysTacos/cart.png" alt="chickenMango" width="300"/>
        </td>
    </tr>
</table>
