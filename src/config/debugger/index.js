import DebugApiCall from "./debugApiCall";

class GlobalVariable {
    constructor() {
        this.debugData = [];
    }
    render(){
        return (
            <DebugApiCall props={this.debugData} />
        )
    }

}

export default new GlobalVariable(); 
