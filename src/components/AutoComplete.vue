<template>
  <div class="w-full">
    <div class="flex">
      <input type="text" class="input input-bordered" v-model="data.query" @input="onInput"
        placeholder="Cari..." />
      <button class="btn" type="button" @click="search">Cari</button>
    </div>
    <ul v-if="filteredSuggestions.length">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { StudentService } from '../services/StudentService';

const props = defineProps(['query','service'])

const model = defineModel()

// const emit = defineEmits(['onSelect'])
const data = reactive({
  query: '',
  suggestions: [],
});

data.query=props.query;


const filteredSuggestions = computed(() => {
  if (data.query === '') {
    return [];
  }
  return data.suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(data.query.toLowerCase())
  );

})

function onInput(x) {
  console.log(x.target.value);
}



function search() {
 props.service.search(data.query).then(response => {
    data.suggestions = response.data.map((item) => {
      return { id: item.id, name: item.name, data: item }
    });
  })
}


function selectSuggestion(suggestion) {
  data.query = suggestion.name;
  model.value = suggestion;
  data.suggestions = [];
}

</script>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
}

li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
