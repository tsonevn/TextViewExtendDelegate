export class newUITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    
        public static ObjCProtocols = [UITextViewDelegate];
    
        private _originalDelegate: UITextViewDelegate;
    
        public static initWithOriginalDelegate(originalDelegate: UITextViewDelegate): newUITextViewDelegateImpl {
            console.log("initWithOwner")
    
            let delegate = <newUITextViewDelegateImpl>newUITextViewDelegateImpl.new();
            delegate._originalDelegate = originalDelegate;
        
            console.log(delegate);
            console.log(delegate._originalDelegate);
            return delegate;
        }
    
        public textViewShouldBeginEditing(textView: UITextView): boolean {
            console.log("textViewShouldBeginEditing");
            return this._originalDelegate.textViewShouldBeginEditing(textView);
        }
    
        public textViewDidEndEditing(textView: UITextView) {
            console.log("textViewDidEndEditing");
            return this._originalDelegate.textViewDidEndEditing(textView);
        }
    
        public textViewDidChange(textView: UITextView) {
            console.log("textViewDidChange");
            return this._originalDelegate.textViewDidChange(textView);
        }
    
        public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, replacementString: string): boolean {
            console.log("textViewShouldChangeTextInRangeReplacementText");
            console.log(range.location);
            return this._originalDelegate.textViewShouldChangeTextInRangeReplacementText(textView, range, replacementString);
        }
    
        
        public textViewShouldInteractWithURLInRange(textView: UITextView, URL: NSURL, characterRange: NSRange): boolean{
            
            return true;
        }
        public textViewDidChangeSelection(textView: UITextView) {
            console.log("textViewDidChangeSelection");
            let range = textView.selectedRange;
            console.log("range -start location");
            console.log(range.location);
        }
    }