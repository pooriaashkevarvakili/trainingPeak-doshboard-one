<template>
  <div>
    <vue-horizontal :displacement="0.7" class="horizontal">
      <template v-slot:btn-next>
        <div class="replaced-btn">
          <div>
            <q-icon name="icon-ic_fluent_chevron_right_16_regular"/>
          </div>
        </div>
      </template>
      <template v-slot:btn-prev>
        <div class="replaced-btn">
          <div>
            <q-icon name="icon-ic_fluent_chevron_left_16_regular"/>
          </div>
        </div>
      </template>

      <div v-for="(item, index) in userItems" :key="index" class="item">
        <q-card bordered class="row no-wrap goal" flat tabindex="0" :style="{backgroundColor: item.state==='still'?'':states.find(_s=>_s.name===item.state).backgroundColor}">
          <q-card-section v-if="item.state==='still'" class="goal-text" style="margin-top: auto; margin-bottom: auto;">
            <q-icon :name="item.type==='goal'?'icon-ic_fluent_target_20_regular':'icon-ic_fluent_note_20_regular'"
                    class="q-mr-sm" size="24px"/>
            <span>{{ item.type === 'goal' ? item.description : (item.title || 'untitled') }}</span>
            <br v-if="item.type==='note'"/><span v-if="item.type==='note' && item.description" style="font-size: 85%; margin-left: 32px;" class="ellipsis">
            {{ item.description || 'untitled' }}</span>
          </q-card-section>
          <q-space v-if="item.state==='still'"/>
          <q-card-actions v-if="item.state==='still'" class="no-padding q-mr-sm justify-center goal-actions">
            <q-btn class="column" color="positive" dense flat icon="icon-ic_fluent_checkmark_16_regular" round
                   size="12px" @click="changeItemState(index, 'done')"/>
            <q-btn class="column no-margin" color="negative" dense flat icon="icon-ic_fluent_delete_20_regular" round
                   size="12px" @click="changeItemState(index, 'deleting')"/>
          </q-card-actions>
          <q-card-section v-if="item.state==='deleting'" class="full-width text-center">
            <span>{{ $t('components.reminders.sure') }}</span>
            <div class="row justify-center">
              <q-btn class="column q-mx-sm" color="negative" dense flat label="Yes" round
                     size="12px" @click="changeItemState(index, 'deleted')"/>
              <q-btn class="column q-mx-sm" color="positive" dense flat label="No" round
                     size="12px" @click="changeItemState(index, 'still')"/>
            </div>
          </q-card-section>
          <q-card-section v-if="['done','deleted'].includes(item.state)" class="full-width text-center text-white" style="margin-top: auto; margin-bottom: auto;">
            {{ item.state.charAt(0).toUpperCase() + item.state.slice(1) }}
          </q-card-section>
        </q-card>
      </div>
    </vue-horizontal>
  </div>
</template>

<script>
import VueHorizontal from 'vue-horizontal'

export default {
  name: 'horizontal-list',
  components: {
    VueHorizontal
  },
  props: {
    reminders: {
      required: false
    }
  },
  data () {
    return {
      userItems: [],
      states: [
        { name: 'done', backgroundColor: 'rgba(33,186,69, 0.8)' },
        { name: 'deleted', backgroundColor: 'rgba(206,1,23,0.8)' },
        { name: 'deleting', backgroundColor: '' }
      ]
    }
  },
  computed: {
    goalHeight () {
      if (document.getElementsByClassName('goal')[0].offsetHeight > 75) {
        for (let el of document.getElementsByClassName('goal-actions')) {
          el.style['flex-flow'] = 'column'
        }
      }
    }
  },
  methods: {
    changeItemState(index, newState) {
      let newValue = this.userItems[index]
      newValue.state = newState
      this.userItems.splice(index, 1, newValue)
      if(['done','deleted'].includes(newState))
        setTimeout(()=>this.userItems.splice(index, 1), 700)
    }
  },
  beforeMount () {
    this.userItems = this.reminders
    this.userItems.map(item=>{ item.state = 'still'; })
  },
  mounted () {
    this.goalHeight
  }
}
</script>

<style lang="scss" scoped>
.horizontal > > > .v-hl-btn-next {
  top: 0;
  bottom: 0;
}

.replaced-btn {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.replaced-btn > div {
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: black;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
}

.goal {
  height: 100%;
  transition: background-color 0.3s ease-in-out;
}

.goal-actions {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;
}

.item {
  transition: width 0.4s ease-in-out;
  overflow-x: hidden;
}

.item:hover {
  width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count) + 50px);

  .goal-actions {
    display: flex;
  }

  .goal-text {
    max-width: 80%;
  }
}

/*<!-- Responsive Breakpoints -->*/
.horizontal {
  --fixed: 220px;
  --count: 2;
  --gap: 12px;
  --margin: 24px;
}

@media (min-width: 1000px) {
  .horizontal {
    --count: 3;
    --margin: 0;
  }
}

@media (min-width: 1250px) {
  .horizontal {
    --count: 4;
    --margin: 0;
  }
}

@media (min-width: 1500px) {
  .horizontal {
    --count: 5;
    --margin: 0;
  }
}

@media (max-width: 767.98px) {
  .item {
    width: var(--fixed);
    padding: 0 calc(var(--gap) / 2);
  }

  .item:first-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-left: var(--margin);
  }

  .item:last-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-right: var(--margin);
  }

  .item:only-child {
    width: calc(var(--fixed) + var(--margin) * 2 - var(--gap));
  }

  .horizontal {
    margin: 0 calc(var(--margin) * -1);
  }
}

@media (min-width: 768px) {
  .item {
    width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
    margin-right: var(--gap);
  }
}
</style>
