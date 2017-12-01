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

custom error tip
```html
<input v-model="a" v-validator="[{rule: 'required', message: 'can not be null', rule: 'number', message: 'must be number'}]">
<span>{{$validator.firstError('a')}}</span>
```

automatic error tip

set ``appendErrorTip = true``
```html
<input v-model="a" validator-appendErrorTip="true" v-validator="[{rule: 'required', message: 'can not be null', rule: 'number', message: 'must be number'}]">
<!-- error tip will append here automatically -->
```



**There are more powerful and flexible usage, see our [documentation and demos](#)**