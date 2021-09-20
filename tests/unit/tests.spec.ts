import {mount, VueWrapper} from '@vue/test-utils';
import {ComponentPublicInstance, nextTick} from 'vue';
import {ProgressBar, useProgress, Vue3ProgressPlugin} from '../../dist';


function doMount(): VueWrapper<ComponentPublicInstance<any>> {
  const wrapper = mount(ProgressBar, {
    global: {
      plugins: [Vue3ProgressPlugin],
    },
  });
  return wrapper;
}

test('is initially hidden', async () => {
  const wrapper = doMount();

  const container = await wrapper.find('.vue3-progress-bar-container[active=false]');
  expect(container.exists()).toBeTruthy();
});

async function expectShown(wrapper: VueWrapper<ComponentPublicInstance<any>>) {
  await nextTick();

  let container = await wrapper.find('.vue3-progress-bar-container[active=true]');
  expect(container.exists()).toBeTruthy();

  container = await wrapper.find('.vue3-progress-bar-container[active=false]');
  expect(container.exists()).toBeFalsy();
}

async function expectHidden(wrapper: VueWrapper<ComponentPublicInstance<any>>) {
  await nextTick();

  let container = await wrapper.find('.vue3-progress-bar-container[active=true]');
  expect(container.exists()).toBeFalsy();

  container = await wrapper.find('.vue3-progress-bar-container[active=false]');
  expect(container.exists()).toBeTruthy();
}

test('shows and hides', async () => {
  const wrapper = doMount();

  const progress1 = useProgress().start();
  await expectShown(wrapper);

  progress1.finish();
  await expectHidden(wrapper);
});

test('attaches to promise success', async () => {
  const wrapper = doMount();

  let resFn = (v: unknown) => {
    return;
  };
  const promise = new Promise((res, rej) => {
    resFn = res;
  });

  useProgress().attach(promise);
  await expectShown(wrapper);

  await resFn(null);
  await expectHidden(wrapper);
})

test('attaches to promise reject', async () => {
  const wrapper = doMount();

  let rejFn = (v: unknown) => {
    return;
  };
  const promise = new Promise((res, rej) => {
    rejFn = rej;
  });

  useProgress().attach(promise);
  await expectShown(wrapper);

  await rejFn(null);
  await expectHidden(wrapper);
});

test('handles multiple progresses', async () => {
  const wrapper = doMount();

  const progress1 = useProgress().start();
  const progress2 = useProgress().start();
  await expectShown(wrapper);

  progress1.finish();
  await expectShown(wrapper);

  progress2.finish();
  await expectHidden(wrapper);
});

test('handles multiple finishes gracefully', async () => {
  const wrapper = doMount();

  const progress1 = useProgress().start();
  const progress2 = useProgress().start();
  await expectShown(wrapper);

  progress1.finish();
  progress1.finish();
  progress1.finish();
  await expectShown(wrapper);

  progress2.finish();
  await expectHidden(wrapper);

  progress1.finish();
  progress2.finish();
  await expectHidden(wrapper);

  const progress3 = useProgress().start();
  progress1.finish();
  progress2.finish();
  await expectShown(wrapper);

  progress3.finish();
  await expectHidden(wrapper);
});

test('is usable via global property', async () => {
  const wrapper = doMount();

  const progress = wrapper.vm.$progress.start();
  expectShown(wrapper);

  progress.finish();
  expectHidden(wrapper);
});
