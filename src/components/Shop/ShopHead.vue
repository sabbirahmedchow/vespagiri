<template>
    <!--Breadcrumb section-->
    <div class="breadcrumb_section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb_inner">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><i class="zmdi zmdi-chevron-right"></i></li>
                            <li>{{ title }}</li>
                            <li v-if="name"><i class="zmdi zmdi-chevron-right"></i></li>
                            <li v-if="name">{{ name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Breadcrumb section end-->
</template>
<script setup>
  defineProps(['title', 'name'])
</script>