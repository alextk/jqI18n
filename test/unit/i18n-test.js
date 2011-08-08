module("I18n", {setup: function(){
  var obj = this.obj = function(){
    this.age = 111;
  };
  obj.i18n = $.i18n();

  obj.i18n.register('en-US', {
    age: '1234',
    name: 'alex',
    messages: {
      intro: 'welcome',
      error: 'error code is %{code}',
      notice: 'number %{n} is greater than %{l} because its %{n}',
      yoko: {
        koko: 'asdf',
        moko: 'asdfasdf'
      }
    },
    numbered: "one is {0} and two is {1} and again one is {0}"
  });

  obj.i18n.register('de-GR', {
    age: '4321',
    name: 'asdf',
    messages: {
      intro: 'welcome',
      error: 'error code is %{code}',
      notice: 'number %{n} is greater than %{l} because its %{n}'
    },
    numbered: "one is {0} and two is {1} and again one is {0}"
  });

}});

test("Basic requirements", function() {
  ok( $.i18n, "$.i18n not present" );
});

test("locale()", function() {
  var obj = this.obj;

  equals(obj.i18n.locale(), 'en-US');
  equals(obj.i18n.translate('puki'), 'puki');
  equals(obj.i18n.translate('puki.do'), 'puki.do');
  equals(obj.i18n.t('puki'), 'puki');
  equals(obj.i18n.t('puki.do'), 'puki.do');
  raises(function(){ obj.i18n.locale('he-IL')} , "Locale he-IL is not registered");

  obj.i18n.locale('de-GR');
  equals(obj.i18n.locale(), 'de-GR');
});

test("translate()", function() {
  var obj = this.obj;

  equals(obj.i18n.locale(), 'en-US');
  equals(obj.i18n.translate('age'), '1234');
  equals(obj.i18n.t('age'), '1234');
  equals(obj.i18n.t('name'), 'alex');
  equals(obj.i18n.t('messages.intro'), 'welcome');
  equals(obj.i18n.t('messages.yoko.koko'), 'asdf');
  equals(obj.i18n.t('messages.yoko.moko'), 'asdfasdf');
  equals(obj.i18n.t('messages.error'), 'error code is %{code}');
  equals(obj.i18n.t('messages.error', {code: 404}), 'error code is 404');
  equals(obj.i18n.t('messages.error', {puki: 404}), 'error code is %{code}');
  equals(obj.i18n.t('messages.notice', {l: 4, n: 5}), 'number 5 is greater than 4 because its 5');
  equals(obj.i18n.t('numbered', 11, 22), 'one is 11 and two is 22 and again one is 11');


});

test("register()", function() {
  var obj = this.obj;

  obj.i18n.register('en-US', {
    age: '456'
  });

  equals(obj.i18n.locale(), 'en-US');
  equals(obj.i18n.t('age'), '456');

  obj.i18n.register('en-US', {
    age: '456'
  }, true);

  equals(obj.i18n.locale(), 'en-US');
  equals(obj.i18n.t('age'), '456');
  equals(obj.i18n.t('messages.intro'), 'messages.intro');
});
