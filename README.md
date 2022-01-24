# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## Installation

```bash
cd ceinvatam
npm install
```

## Docs

https://vuejsexamples.com/vue-3-multiselect-component-with-multiselect-and-tagging-options/

https://blog.ninja-squad.com/2021/09/30/script-setup-syntax-in-vue-3/


## TODOs

```javascript
async fetchSearchResults({ state, commit, getters }) {
      if (getters.userInputIsEmpty) {
        commit('addErrorMessage', 'Please select a city or a search phrase.')
        return;
      }

      let { data: classes, error } = await supabase
        .from('classes')
        .select(`id, name, score, score_count, offline, online, duration, 
          cities:class2cities(city_id), partner:partners(name)`
        )
        .textSearch('textsearch_idx_col', prepareTextSearchTerms(state.searchPhrase), { config: 'romanian' })
        .in('cities.city_id', [7, ])

      commit('setSearchResults', classes);
    }
```