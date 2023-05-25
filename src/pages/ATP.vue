<!-- =========================================================================================
    File Name: Atp.vue
    Description: Atp Component
    Component Name: Atp
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-page>
        <section>
            <div dir="rtl" style="font-size: 24px;font-family: farsi-bold;">برنامه سالیانه</div>
        </section>
        <section>
            <div class="q-mt-xl">
                <div id="main" style="width: 100%;width:1230px; height: 300px; margin-bottom: 8px;" class="q-card q-mt-sm">

                </div>

                <div style="max-width:100%;width:1500px;height:200px" class="q-card">

                    <q-markup-table :rows="rows" :group-options="{
                        enabled: true
                    }" :sort-options="{ enabled: false }" styleClass="vgt-table condensed bordered"
                        max-height="calc(100vh - 400px)" :fixed-header="true">
                        <thead>
                            <tr>
                                <th v-for="(item, index) in columns" :key="index" class="text-left">{{ item.label }}
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-left">Frozen Yogurt</td>
                                <td class="text-right">159</td>
                                <td class="text-right">6</td>
                                <td class="text-right">24</td>
                                <td class="text-right">4</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                            </tr>
                            <tr>
                                <td class="text-left">Ice cream sandwich</td>
                                <td class="text-right">237</td>
                                <td class="text-right">9</td>
                                <td class="text-right">37</td>
                                <td class="text-right">4.3</td>
                                <td class="text-right">129</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                            </tr>
                            <tr>
                                <td class="text-left">Eclair</td>
                                <td class="text-right">237</td>
                                <td class="text-right">9</td>
                                <td class="text-right">37</td>
                                <td class="text-right">4.3</td>
                                <td class="text-right">129</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                            </tr>
                            <tr>
                                <td class="text-left">Cupcake</td>
                                <td class="text-right">237</td>
                                <td class="text-right">9</td>
                                <td class="text-right">37</td>
                                <td class="text-right">4.3</td>
                                <td class="text-right">129</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                                <td class="text-right">87</td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </div>
            </div>
        </section>
    </q-page>
</template>
<script src="./Atp">
</script>
<style lang="scss">
@import "../css/ATP"
</style>
  