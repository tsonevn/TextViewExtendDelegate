/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TextView } from "ui/text-view"
import { HelloWorldModel } from './main-view-model';
import { isIOS, isAndroid } from "platform"
declare var android: any;
var delegateModule;
if (isIOS) {
    delegateModule = require("./delegate");
}
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = new HelloWorldModel();
}
import placeholder = require("ui/placeholder");

export function creatingView(args: placeholder.CreateViewEventData) {
    if (isAndroid) {
        var ExtendedEditableText = android.widget.EditText.extend({
            onTouch: function (view, event) {
                console.log("on touch");
            },
            onSelectionChanged: function (start, end) {
                console.log("onSelectionChanged");
                console.log("start " + start, "end ", end);

            }
        })
        var nativeView = new ExtendedEditableText(args.context)
        nativeView.setSingleLine(true);
        nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
        nativeView.setText("Native");
        args.view = nativeView;
    }
}

export function textViewloaded(args){
    var textview:TextView = <TextView>args.object;
 if(isIOS){
     var tv =<any>textview;

         var uiTextView = tv.ios;
         console.log("delegate first");
         console.log(uiTextView.delegate);
         let newDelegate = delegateModule.newUITextViewDelegateImpl.initWithOriginalDelegate(tv._delegate);
         tv._delegate = newDelegate;
         uiTextView.delegate=newDelegate;
         console.log("delegate second");
         console.log(uiTextView.delegate);
 }
}