import {Controller, Route, Get, Tags, Query, Path, Body, Post} from 'tsoa';
@Route('HelloWorld') // route name => localhost:xxx/helloWorld
@Tags('HelloWorldController') // => Under HelloWorldController tag
export class HelloWorldController extends Controller {
  @Get() //specify the request type
  hellovv(): HelloWorldInterface {
    return {message: 'Hello World!'};
  }
}

@Route('SayMessage') // route name => localhost:xxx/helloWorld
@Tags('HelloWorldController') // => Under HelloWorldController tag
export class SayMessage extends Controller {
  @Get('{msg}') //specify the request type
  helloaa(@Path() msg: string): HelloWorldInterface {
    return {message: msg};
  }
}

@Route('SayHello') // route name => localhost:xxx/helloWorld
@Tags('HelloWorldController') // => Under HelloWorldController tag
export class SayHello extends Controller {
  @Get() //specify the request type
  helloss(@Query() msg: string): HelloWorldInterface {
    return {message: msg};
  }
}

@Route('SpecialHello') // route name => localhost:xxx/helloWorld
@Tags('HelloWorldController') // => Under HelloWorldController tag
export class SpecialHello extends Controller {
  @Post() //specify the request type
  hellossaa(@Body() msg: HelloWorldInterface): HelloWorldInterface {
    return {message: msg.message};
  }
}

//參考結構體
export interface HelloWorldInterface {
  message: string;
}
