<template>
  <el-card class="account-card">
    <div class="form-container">
      <div class="form-group">
        <div class="labels-wrapper">
          <label for="labels">Метка</label>
          <span
            class="form-group__info"
            @click="toggleTooltip"
            @mouseenter="showHoverTooltip = true"
            @mouseleave="showHoverTooltip = false"
          >?</span>
          <div v-if="showHoverTooltip" class="tooltip">Для указания нескольких меток используйте разделитель ;</div>
          <div v-if="showTooltip" class="tooltip fixed-tooltip">
            Для указания нескольких меток используйте разделитель ;
            <button class="close-tooltip" @click="showTooltip = false">×</button>
          </div>
        </div>
        <el-input
          id="labels"
          v-model="labelsString"
          placeholder="Введите метки через ;"
          @blur="parseLabels"
          @input="validateLabels"
          :maxlength="50"
        />
      </div>
      <div class="form-group">
        <label for="type">Тип записи</label>
        <el-select id="type" v-model="account.type" @change="togglePasswordField">
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </div>

      <div class="form-group">
        <label for="login">Логин</label>
        <el-input
          id="login"
          v-model="account.login"
          placeholder="Введите логин"
          :maxlength="100"
          :class="{ error: !account.login && touched.login }"
          @blur="touched.login = true"
        />
      </div>
      <div class="form-group" v-if="account.type === 'Локальная'">
        <label for="password">Пароль</label>
        <el-input
          id="password"
          v-model="account.password"
          placeholder="Введите пароль"
          :maxlength="100"
          show-password
          :class="{ error: !account.password && touched.password }"
          @blur="touched.password = true"
        />
      </div>
      <el-button class="account-card__delete" link @click="deleteAccount">
        <el-icon><delete /></el-icon>
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { Account } from '../stores/useAccountStore'

const props = defineProps<{ account: Account }>();
const emit = defineEmits(["update", "delete"]);

const touched = reactive({ login: false, password: false });
const showTooltip = ref(false);
const showHoverTooltip = ref(false);

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value;
};

const labelsString = computed({
  get: () => props.account.labels.map(l => l.text).join("; "),
  set: (val) => {
    emit("update", { ...props.account, labels: val.split(";").map(l => ({ text: l.trim() })).filter(l => l.text) });
  },
});

const parseLabels = () => {
  emit("update", { ...props.account, labels: labelsString.value.split(";").map(text => ({ text: text.trim() })).filter(l => l.text) });
};

const togglePasswordField = () => {
  emit("update", { ...props.account, password: props.account.type === "LDAP" ? null : "" });
};

const deleteAccount = () => {
  emit("delete", props.account.id);
};

const validateLabels = (event: Event) => {
  const input = event?.target as HTMLInputElement;
  const filteredValue = input.value.replace(/[^a-zA-Zа-яА-Я0-9 ;]/g, "");
  labelsString.value = filteredValue;
};

</script>

<style scoped>
.account-card {
  margin-bottom: 10px;
  padding: 10px;
}

.info-icon {
  position: absolute;
  right: -20px;
  top: 25px;
  cursor: pointer;
  color: #409eff;
}

.info-icon:hover {
  color: #66b1ff;
}

.form-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.account-card__delete {
  position: absolute;
  bottom: 6px;
  right: -20px;
}

.error {
  border: 1px solid red;
}

.labels-wrapper {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.form-group__info {
  cursor: pointer;
  display: inline-flex;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid black;
  width: 15px;
  height: 15px;
}

.tooltip {
  position: absolute;
  left: 0;
  top: -27px;
  background: #333;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  visibility: visible;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

.fixed-tooltip {
  position: absolute;
  top: 30px;
  left: 0;
  background: #fff;
  color: #333;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.close-tooltip {
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  margin-left: 10px;
}
</style>
