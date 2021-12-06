<template>
    <div class="container">
        <div class="left-column">
            <img class="active"
            v-bind:src="user.profile_image"
            v-bind:alt="user.ocupation"
            />
        </div>
        <div class="right-column">
            <div class="userInformation">
                <h1>{{ user.username }}</h1>
                <h3> {{ user.email }} </h3>
            </div>
            <div class="userPosts">
                
            </div>

        </div>
    </div>
</template>