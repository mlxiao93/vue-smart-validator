A Vue.js directive for form validation 

### Installation

```
npm instal vue-smart-validator --save
```

### Getting Started

In your scirpt entry point:
```
import Vue from 'vue';
import Validator from 'vue-smart-validator';

Vue.use(new Validator());
```

### Basic Usage

Custom error tip
```html
<input v-model="a" v-validator="[{rule: 'required', message: 'can not be null'}, {rule: 'number', message: 'must be number'}]">
<span>{{$validator.firstError('a')}}</span>
```

Automatic error tip

set ``appendErrorTip = true``
```html
<input v-model="a" validator-appendErrorTip="true" v-validator="[{rule: 'required', message: 'can not be null'}, {rule: 'number', message: 'must be number'}]">
<!-- error tip will append here automatically -->
```

Trigger validation after submitted
```
methods: {    // vue methods
    handleSubmit() {
        let error = this.$validator.check().getError();
        if (error) {
            alert('has error');
            return
        }
    }
}
```

----

**There are more powerful and flexible usage, see our [documentation and demos](//mlxiao93.github.io/docs-vue-smart-validator/index.html#/dash/intro)**
