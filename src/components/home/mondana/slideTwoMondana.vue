<!-- =========================================================================================
    File Name: slideTwoMondana.vue
    Description: slideTwoMondana Component
    Component Name: slideTwoMondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <div class="q-col-gutter-md q-ml-xs q-py-sm q-mt-sm row">
        <q-card class="q-pa-md q-mt-sm" style="border-radius: 16px;width:350px;height:333px">
            <div class="row">
                <div style="background-color: #F0F0F0;width:160px;height:92px;border-radius: 20px;">
                    <div style="position: relative;top:10px" class="text-center">
                        نشاط
                    </div>
                    <div class="row">
                        <div class="q-ml-sm q-pa-sm row q-mt-sm"
                            style="border-radius: 56px;width:74px;height:32px;background-color: #C3E6E2;">
                            <q-icon size="xs" class="q-ml-sm" style="color:#2D837A" name="moving" />

                            <span style="color:#2D837A">90</span>
                        </div>
                        <img class="q-ml-sm" src="azole.svg" />
                    </div>

                </div>

                <div class="col">
                    <div class="q-ml-sm row" style="border-radius: 16px;background-color: #F0F0F0;width:160px;height:42px">
                        <div style="position: relative;top:10px;right:15px">
                            میزان خستگی
                        </div>
                        <div class=" flex flex-center text-white"
                            style="position: relative;top:7px;right:40px;border-radius: 56px;background-color: #DA3030;width: 30px;height: 25px;">
                            <span style="position: relative;top:2px">9</span>
                        </div>
                    </div>
                    <div class="q-ml-sm q-mt-sm row"
                        style="border-radius: 16px;background-color: #F0F0F0;width:160px;height:42px">
                        <div style="position: relative;top:10px;right:15px">
                            آمادگی
                        </div>
                        <div class=" flex flex-center text-white"
                            style="position: relative;top:7px;right:80px;border-radius: 56px;background-color: #2D837A;width: 30px;height: 25px;">
                            <span style="position: relative;top:2px">20</span>
                        </div>
                    </div>
                </div>

            </div>
            <div style="font-family: farsi-bold;" class="q-mt-lg"> ضریب تغییرآمادگی</div>
            <div style="position:relative;top:15px" class="row ">
                <div class="row">
                    <div>7</div>
                    <div style="position:relative;right:5px">روز</div>
                    <div style="position:relative;right:10px">گذشته</div>
                </div>

                <img style="position:relative;bottom:5px;right:30px" src="chart.svg" />
                <div style="color:#DF2063;position: relative;right:35px">2-</div>
            </div>
            <div style="position:relative;top:30px" class="row ">
                <div class="row">
                    <div>28</div>
                    <div style="position:relative;right:5px">روز</div>
                    <div style="position:relative;right:10px">گذشته</div>
                </div>

                <img style="position:relative;bottom:5px;right:20px" src="chart.svg" />
                <div style="color:#DF2063;position: relative;right:28px">0</div>
            </div>
            <div style="position:relative;top:50px" class="row ">
                <div class="row">
                    <div>90</div>
                    <div style="position:relative;right:7px">روز</div>
                    <div style="position:relative;right:10px">گذشته</div>
                </div>

                <img style="position:relative;bottom:5px;right:20px" src="chart.svg" />
                <div style="color:#DF2063;position: relative;right:27px">19</div>
            </div>
            <div style="position:relative;top:70px" class="row ">
                <div class="row">
                    <div>365</div>
                    <div style="position:relative;right:2px">روز</div>
                    <div style="position:relative;right:4px">گذشته</div>
                </div>

                <img style="position:relative;bottom:5px;right:10px" src="chart.svg" />
                <div style="color:#DF2063;position: relative;right:15px">21</div>
            </div>
        </q-card>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>