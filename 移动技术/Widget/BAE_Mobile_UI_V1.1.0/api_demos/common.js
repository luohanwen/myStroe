/**
 * Created by JetBrains WebStorm.
 * User: cmcc
 * Date: 13-7-19
 * Time: 下午1:45
 * To change this template use File | Settings | File Templates.
 */
function back(){
    window.history.back()
}
try {
    Widget.onBackPressed = function() {
        back();
    }
}catch(e){

}
