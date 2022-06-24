<script setup lang="ts">
import { runReptile } from '../../api';
import { IParams, IContent } from '@/api/index.d';
import { FormInst, useMessage } from 'naive-ui';
const message = useMessage();

const params = reactive<IParams>({
  url: '',
  fileName: '',
  filePath: '',
  isLazyLoading: false,
  isList: false,

  listSelector: '',
  listTagName: '',
  nextSelector: '',
  contents: [],
});

const content = reactive<IContent>({
  selector: '',
  saveType: 1,
  type: 1,
});

const rules = reactive({
  url: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入需要爬取的URL地址',
  },
  // 表头选择器
  listSelector: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入表头选择器',
  },
  // 列表每行元素
  listTagName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入列表每行元素',
  },
  // 下一页选择器
  nextSelector: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入下一页选择器',
  },
  // 保存文件名
  fileName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入保存文件名',
  },
  // 保存文件地址
  filePath: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入保存文件地址',
  },
  // 选择器
  selector: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入选择器',
  },
});

const configRef = ref<FormInst | null>(null);

const formRef = ref<FormInst | null>(null);

const addConfig = (e: MouseEvent) => {
  e.preventDefault();

  configRef.value?.validate((errors) => {
    console.log(errors);
    if (!errors) {
      params.contents.push(content);
      message.success('添加成功');
    }
  });
};

const clearConfig = (e: MouseEvent) => {
  e.preventDefault();

  configRef.value?.restoreValidation();
  params.contents = [];
};

const getContents = async (e: MouseEvent) => {
  e.preventDefault();
  if (params.contents.length) {
    return message.warning('请添加配置项');
  }
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { success, message: msg } = await runReptile(
        'http://192.168.110.229:4329/v1/crawler/enableCrawler',
        params
      );
      if (!success) {
        return message.error(msg);
      }
      message.success('开启爬取中...');
    }
  });
};

const selectTypes = reactive({
  value: ref(null),
  options: [
    {
      value: 1,
      label: 'css选择器',
    },
    {
      value: 2,
      label: 'xpath选择器',
    },
  ],
});

const saveTypes = reactive({
  value: ref(null),
  options: [
    {
      value: 1,
      label: 'txt',
    },
    {
      value: 2,
      label: 'html富文本',
    },
    {
      value: 3,
      label: '图片文件',
    },
  ],
});
</script>

<template>
  <div>
    <n-space vertical>
      <div style="font-weight: bold; text-align: center; margin-bottom: 30px">
        你添加了 {{ params.contents.length }} 个配置项
      </div>
      <n-form
        ref="configRef"
        :model="params"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="选择器" path="selector">
          <n-input
            v-model:value="content.selector"
            type="text"
            placeholder="请输入选择器"
            clearable
          />
        </n-form-item>

        <n-form-item label="选择器类型">
          <n-radio-group v-model:value="content.type">
            <n-space>
              <n-radio
                v-for="item in selectTypes.options"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="保存文件类型">
          <n-radio-group v-model:value="content.saveType">
            <n-space>
              <n-radio
                v-for="item in saveTypes.options"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-space vertical>
          <n-button type="info" block @click="addConfig" attr-type="button">
            添加配置项
          </n-button>
          <n-button block @click="clearConfig">重置配置项</n-button>
        </n-space>
      </n-form>

      <n-divider />

      <n-form
        ref="formRef"
        :model="params"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="目标地址" path="url">
          <n-input
            v-model:value="params.url"
            type="text"
            placeholder="请输入爬取URL网址"
            clearable
          />
        </n-form-item>
        <n-form-item label="是否为列表">
          <n-switch v-model:value="params.isList" :round="false" />
        </n-form-item>

        <n-form-item label="表头选择器" path="listSelector">
          <n-input
            v-model:value="params.listSelector"
            type="text"
            placeholder="请输入表头选择器"
            clearable
          />
        </n-form-item>

        <n-form-item label="列表每行元素" path="listTagName">
          <n-input
            v-model:value="params.listTagName"
            type="text"
            placeholder="请输入列表每行元素"
            clearable
          />
        </n-form-item>

        <n-form-item label="下一页选择器" path="nextSelector">
          <n-input
            v-model:value="params.nextSelector"
            type="text"
            placeholder="请输入下一页选择器"
            clearable
          />
        </n-form-item>

        <n-form-item label="延迟加载">
          <n-switch v-model:value="params.isLazyLoading" :round="false" />
        </n-form-item>

        <n-form-item label="保存文件名" path="fileName">
          <n-input
            v-model:value="params.fileName"
            type="text"
            placeholder="请输入保存文件名"
            clearable
          />
        </n-form-item>

        <n-form-item label="保存文件地址" path="filePath">
          <n-input
            v-model:value="params.filePath"
            type="text"
            placeholder="请输入保存文件地址"
            clearable
          />
        </n-form-item>

        <n-button type="info" block @click="getContents" attr-type="button">
          开始爬取
        </n-button>
      </n-form>
    </n-space>
  </div>
</template>
