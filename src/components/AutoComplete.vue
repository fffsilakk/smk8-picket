<template>
  <div class="w-full">
    <input type="text" class="input input-bordered" v-model="data.query" @input="onInput"
      placeholder="Type to search..." />
    <ul v-if="filteredSuggestions.length">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';

const props = {
  query: String,
  suggestions: Array,
}
const emit = defineEmits(['onChange', 'onSelect'])
const data = reactive({
  query: '',
  suggestions: ['Apple', 'Banana', 'Orange', 'Grapes', 'Cherry', 'Pineapple'],
});

const filteredSuggestions = computed(() => {
  if (data.query === '') {
    return [];
  }
  return data.suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(data.query.toLowerCase())
  );

})

function onInput(x) {
  console.log( x.target.value);
  emit('onChange', data.query);
}
function selectSuggestion(suggestion) {
  data.query = suggestion;
  // Clear suggestions after selecting one
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
