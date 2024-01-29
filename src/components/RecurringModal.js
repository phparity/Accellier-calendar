
import { useContext } from "react"
import { Modal, Button, ModalFooter } from "react-bootstrap"
import { AuthContext } from "../config/Authentications/AuthContext"
import { recurringModal } from "../pages/OpCreatePage"
import { CheckModuleName } from "../utils/CheckModuleName"

const RecurringModal = ()=>{
    const { authState, setAuthState } = useContext(AuthContext)

let module_name = CheckModuleName()
  const {reccuringrule, setReccuringrule,reccuringtime, setReccuringtime,weekday, setWeekday,reccuringruleSave, setReccuringruleSave,ruleshow, setRuleshow,isrecurr, setIsrecurr,show5, setShow5} = useContext(recurringModal)  
  const weekchange = (e) => {
    if (e.target.type === 'checkbox' && e.target.checked == true) {
      weekday.push(e.target.value)
    } else {
      weekday.splice(weekday.indexOf(e.target.value), 1)
    }
    setReccuringrule({ ...reccuringrule, [e.target.name]: weekday.toString() })
  }

  const customerDetailsss = authState.customerDetails
  const customerDetails = customerDetailsss && JSON.parse(customerDetailsss)
  let e_id = ""
  if (customerDetails && customerDetails[module_name + "_id"]) {
    e_id = customerDetails[module_name + "_id"] || customerDetails[module_name + "id"]
  } else if (customerDetails && customerDetails[module_name + "_id"] == null) {
    e_id = authState.c_id
  }else {
    e_id = authState.c_id
  }
  const handleClose5 = () => setShow5(false);

  const default_recurrence = (time) => {
    if (customerDetails && e_id === null) {
      if (time === "daily") {
        setReccuringrule({
          "repeat": "daily",
          "interval": "1",
          "count": "1"
        })
      } else if (time === "weekly") {
        setReccuringrule({
          "repeat": "weekly",
          "weekDays": "SU",
          "interval": "1",
          "count": "1"
        })
      } else if (time === "monthly") {
        setReccuringrule({
          "repeat": "monthly",
          "day": "1",
          "month": "May",
          "interval": "1",
          "count": "1"
        })
      } else {
        setReccuringrule({
          "repeat": "yearly",
          "day": "1",
          "count": "1",
          "month": "Jan",
          "interval": "1"
        })
      }
    }
  }
    return (
        <Modal show={show5} onHide={handleClose5} className="modal_delete fade small_modal modal">
        <Modal.Header>
          <div className="opportunitiesBox">
            <div className="opportunity-sm">
              <div className="shadows-box-sm">
                <div className="tabToggleDiv">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className={reccuringtime === "daily" ? "nav-link active" : "nav-link"}
                        onClick={() => (setReccuringrule({ "repeat": "daily" }), setReccuringtime("daily"), default_recurrence("daily"))}
                        id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#daily"
                        type="button" role="tab" aria-controls="pills-home" aria-selected="true">Daily</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={reccuringtime === "weekly" ? "nav-link active" : "nav-link"}
                        onClick={() => (setReccuringrule({ "repeat": "weekly" }), setReccuringtime("weekly"), default_recurrence("weekly"))}
                        id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#weekly"
                        type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Weekly</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={reccuringtime === "monthly" ? "nav-link active" : "nav-link"}
                        onClick={() => (setReccuringrule({ "repeat": "monthly" }), setReccuringtime("monthly"), default_recurrence("monthly"))}
                        id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#monthly"
                        type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Monthly</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={reccuringtime === "yearly" ? "nav-link active" : "nav-link"}
                        onClick={() => (setReccuringrule({ "repeat": "yearly" }), setReccuringtime("yearly"), default_recurrence("yearly"))}
                        id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#yearly"
                        type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Yearly</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </Modal.Header>
        <Modal.Body>
          {reccuringtime === "daily" ?
            <div className="tab-content popup-tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="daily" role="tabpanel" aria-labelledby="pills-home-tab">
                <form className="row g-3" id="t-1">
                  <div className="col-12">
                    <div className="pillTable">
                      <h4>Repeat Every</h4>
                      <input type="text" className="form-control inputDiv" defaultValue={reccuringrule.interval}
                        placeholder="1" style={{ "width": "55px", "height": "29px" }}
                        onChange={(e) => setReccuringrule({ ...reccuringrule, ["interval"]: e.target.value })} />
                      <h4>Day</h4>
                    </div>
                    <ul className="tabUl">
                      <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                    </ul>
                  </div>
                </form>
                <h5>Stop Condition</h5>
                <ul className="listGroup">
                  <li className="list-group-item">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                      <label className="form-check-label flexLabel" htmlFor="exampleRadios1">
                        Never stop

                      </label>
                    </div>
                    <ul style={{ "paddingLeft": "18px" }}>
                      <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                    </ul>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" defaultChecked={reccuringrule.until !== undefined ? true : false} name="exampleRadios" id="exampleRadios2" value="option2" />
                      <div className="form-check-label flexLabel" htmlFor="exampleRadios2">
                        Run until a specific date
                      
                        <input className="form-control datepicker" id="datepickerRun" value={reccuringrule.until} placeholder="YYYY-MM-DD"
                          onChange={(e) => setReccuringrule({ ...reccuringrule, ["until"]: e.target.value })}
                          style={{ "width": "140px", "height": "30px" }} />

                      </div>



                    </div>
                    <ul style={{ "padding-left": "18px" }}>
                      <li>The event will run until it reaches a specific date</li>
                    </ul>
                  </li>
                  <li className="list-group-item">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" defaultChecked={reccuringrule.count > 0 ? true : false} name="exampleRadios" id="exampleRadios3" value="option3" />
                      <div className="form-check-label flexLabel" htmlFor="exampleRadios3">
                        Run until it reaches
                        <input type="text" className="form-control" placeholder="1" style={{ "width": "45px" }} defaultValue={reccuringrule.count}
                          onChange={(e) => setReccuringrule({ ...reccuringrule, ["count"]: e.target.value })} /> occurrences
                      </div>
                    </div>
                    <ul style={{ "padding-left": "18px" }}>
                      <li>The event will repeat until it reaches a certain amount of occurrences</li>
                    </ul>
                  </li>
                </ul>
                <hr />

              </div>
            </div> :

            reccuringtime === "weekly" ?
              <div className="tab-content popup-tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="daily" role="tabpanel" aria-labelledby="pills-home-tab">
                  <form className="row g-3" id="t-1">
                    <div className="col-12">
                      <div className="pillTable">
                        <h4>Repeat Every</h4>
                        <input type="text" className="form-control inputDiv" value={reccuringrule.interval}
                          placeholder="1" style={{ "width": "55px", "height": "29px" }}
                          onChange={(e) => setReccuringrule({ ...reccuringrule, ["interval"]: e.target.value })} />
                        <h4>Week</h4>
                      </div>
                      <ul className="tabUl">
                        <li>The event will be repeted every {reccuringrule.interval}th weeks on specific weekdays</li>
                      </ul>
                    </div>
                  </form>
                  <div class="checkBox">
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/SU/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="SU" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="SU" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="SU" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio1">Sun</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/MO/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="MO" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="MO" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="MO" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Mon</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/TU/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="TU" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="TU" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="TU" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Tue</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/WE/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="WE" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="WE" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="WE" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Wed</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/TH/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="TH" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="TH" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="TH" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Thu</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/FR/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="FR" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="FR" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="FR" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Fri</label>
                    </div>
                    <div className="form-check form-check-inline">
                      {reccuringrule.weekDays !== undefined ?
                        reccuringrule.weekDays.match(/SA/g) ?
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="SA" onChange={weekchange} checked /> :
                          <input className="form-check-input" type="checkbox" name="weekDays"
                            id="inlineRadio1" value="SA" onChange={weekchange} /> :
                        <input className="form-check-input" type="checkbox" name="weekDays"
                          id="inlineRadio1" value="SA" onChange={weekchange} />
                      }
                      <label className="form-check-label" for="inlineRadio2">Sat</label>
                    </div>
                  </div>
                  <h5>Stop Condition</h5>
                  <ul className="listGroup">
                    <li className="list-group-item">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                        <label className="form-check-label flexLabel" htmlFor="exampleRadios1">
                          Never stop
                        </label>
                      </div>
                      <ul style={{ "padding-left": "18px" }}>
                        <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                      </ul>
                    </li>
                    <li className="list-group-item">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" defaultChecked={reccuringrule.until !== undefined ? true : false} name="exampleRadios" id="exampleRadios2" value="option2" />
                        <div className="form-check-label flexLabel" htmlFor="exampleRadios2">
                          Run until a specific date
                        
                          <input className="form-control datepicker" id="datepickerRun" placeholder="YYYY-MM-DD"
                            onChange={(e) => setReccuringrule({ ...reccuringrule, ["until"]: e.target.value })}
                            style={{ "width": "140px", "height": "30px" }} defaultValue={reccuringrule.until} />

                        </div>



                      </div>
                      <ul style={{ "padding-left": "18px" }}>
                        <li>The event will run until it reaches a specific date</li>
                      </ul>
                    </li>
                    <li className="list-group-item">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" defaultChecked={reccuringrule.count > 0 ? true : false} name="exampleRadios" id="exampleRadios3" value="option3" />
                        <div className="form-check-label flexLabel" htmlFor="exampleRadios3">
                          Run until it reaches
                          <input type="text" value={reccuringrule.count} className="form-control" placeholder="1" style={{ "width": "45px" }}
                            onChange={(e) => setReccuringrule({ ...reccuringrule, ["count"]: e.target.value })} /> occurrences
                        </div>
                      </div>
                      <ul style={{ "padding-left": "18px" }}>
                        <li>The event will repeat until it reaches a certain amount of occurrences</li>
                      </ul>
                    </li>
                  </ul>
                  <hr />

                </div>
              </div> :

              reccuringtime === "monthly" ?
                <div className="tab-content popup-tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="daily" role="tabpanel" aria-labelledby="pills-home-tab">
                    <form className="row g-3" id="t-1">
                      <div className="col-12">
                        <div className="pillTable">
                          <h4>Repeat Every</h4>
                          <input type="text" className="form-control inputDiv" defaultValue={reccuringrule.interval}
                            placeholder="1" style={{ "width": "55px", "height": "29px" }}
                            onChange={(e) => setReccuringrule({ ...reccuringrule, ["interval"]: e.target.value })} />
                          <h4>Months on the</h4>
                          <div className="monthSelect">
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example"
                              defaultValue={reccuringrule.day}
                              onChange={(e) => setReccuringrule({ ...reccuringrule, ["day"]: e.target.value })}>
                              <option value="1">First</option>
                              <option value="2">Second</option>
                              <option value="3">Third</option>
                              <option value="4">Fourth</option>
                              <option value="5">Fifth</option>
                              <option value="6">Sixth</option>
                              <option value="7">Seventh</option>
                              <option value="8">Eighth</option>
                              <option value="9">Ninth</option>
                              <option value="10">Tenth</option>
                              <option value="11">Eleventh</option>
                              <option value="12">Twelfth</option>
                              <option value="13">Thirteenth</option>
                              <option value="14">Fourteenth</option>
                              <option value="15">Fifteenth</option>
                              <option value="16">Sixteenth</option>
                              <option value="17">Seventeenth</option>
                              <option value="18">Eighteenth</option>
                              <option value="19">Nineteenth</option>
                              <option value="20">Twentieth</option>
                              <option value="21">Twenty-first</option>
                              <option value="22">Twenty-second</option>
                              <option value="23">Twenty-third</option>
                              <option value="24">Twenty-fourth</option>
                              <option value="25">Twenty-fifth</option>
                              <option value="26">Twenty-sixth</option>
                              <option value="27">Twenty-seventh</option>
                              <option value="28">Twenty-eighth</option>
                              <option value="29">Twenty-ninth</option>
                              <option value="30">Thirtieth</option>
                              <option value="31">Thirty-first</option>
                              <option value="-1">Last</option>
                              <option value="-2">Penultimate</option>
                              <option value="-3">Third to last</option>
                              <option value="-4">Fourth to last</option>
                              <option value="-5">Fifth to last</option>
                              <option value="-6">Sixth to last</option>
                              <option value="-7">Seventh to last</option>
                              <option value="-8">Eighth to last</option>
                              <option value="-9">Ninth to last</option>
                              <option value="-10">Tenth to last</option>
                              <option value="-11">Eleventh to last</option>
                              <option value="-12">Twelfth to last</option>
                              <option value="-13">Thirteenth to last</option>
                              <option value="-14">Fourteenth to last</option>
                              <option value="-15">Fifteenth to last</option>
                              <option value="-16">Sixteenth to last</option>
                              <option value="-17">Seventeenth to last</option>
                              <option value="-18">Eighteenth to last</option>
                              <option value="-19">Nineteenth to last</option>
                              <option value="-20">Twentieth to last</option>
                              <option value="-21">Twenty-first to last</option>
                              <option value="-22">Twenty-second to last</option>
                              <option value="-23">Twenty-third to last</option>
                              <option value="-24">Twenty-fourth to last</option>
                              <option value="-25">Twenty-fifth to last</option>
                              <option value="-26">Twenty-sixth to last</option>
                              <option value="-27">Twenty-seventh to last</option>
                              <option value="-28">Twenty-eighth to last</option>
                              <option value="-29">Twenty-ninth to last</option>
                              <option value="-30">Thirtieth to last</option>
                            </select>
                          </div>
                        </div>
                        <ul className="tabUl">
                          <li>The event will be repeted every {reccuringrule.interval} month on specific day of the month</li>
                        </ul>
                      </div>
                    </form>
                    <h5>Stop Condition</h5>
                    <ul className="listGroup">
                      <li className="list-group-item">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                          <label className="form-check-label flexLabel" htmlFor="exampleRadios1">
                            Never stop
                          </label>
                        </div>
                        <ul style={{ "padding-left": "18px" }}>
                          <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                        </ul>
                      </li>
                      <li className="list-group-item">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" defaultChecked={reccuringrule.until !== undefined ? true : false} name="exampleRadios" id="exampleRadios2" value="option2" />
                          <div className="form-check-label flexLabel" htmlFor="exampleRadios2">
                            Run until a specific date
                       
                            <input className="form-control datepicker" id="datepickerRun" placeholder="YYYY-MM-DD"
                              defaultValue={reccuringrule.until}
                              onChange={(e) => setReccuringrule({ ...reccuringrule, ["until"]: e.target.value })}
                              style={{ "width": "140px", "height": "30px" }} />

                          </div>



                        </div>
                        <ul style={{ "padding-left": "18px" }}>
                          <li>The event will run until it reaches a specific date</li>
                        </ul>
                      </li>
                      <li className="list-group-item">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" defaultChecked={reccuringrule.count > 0 ? true : false} name="exampleRadios" id="exampleRadios3" value="option3" />
                          <div className="form-check-label flexLabel" htmlFor="exampleRadios3">
                            Run until it reaches
                            <input type="text" className="form-control" placeholder="1" style={{ "width": "45px" }}
                              defaultValue={reccuringrule.count}
                              onChange={(e) => setReccuringrule({ ...reccuringrule, ["count"]: e.target.value })} /> occurrences
                          </div>
                        </div>
                        <ul style={{ "padding-left": "18px" }}>
                          <li>The event will repeat until it reaches a certain amount of occurrences</li>
                        </ul>
                      </li>
                    </ul>
                    <hr />

                  </div>
                </div> :

                reccuringtime === "yearly" ?
                  <div className="tab-content popup-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="daily" role="tabpanel" aria-labelledby="pills-home-tab">
                      <form className="row g-3" id="t-1">
                        <div className="col-12">
                          <div className="pillTable">
                            <h4>Repeat Every</h4>
                            <input type="text" className="form-control inputDiv" defaultValue={reccuringrule.interval}
                              placeholder="1" style={{ "width": "55px", "height": "29px" }}
                              onChange={(e) => setReccuringrule({ ...reccuringrule, ["interval"]: e.target.value })} />
                            <h4>Year</h4>
                          </div>
                          <ul className="tabUl">
                            <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                          </ul>
                        </div>
                      </form>
                      <h5>Stop Condition</h5>
                      <ul className="listGroup">
                        <li className="list-group-item">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                            <label className="form-check-label flexLabel" htmlFor="exampleRadios1">
                              Never stop
                            </label>
                          </div>
                          <ul style={{ "padding-left": "18px" }}>
                            <li>The event will be repeted every day or every {reccuringrule.interval} days, depending on the value</li>
                          </ul>
                        </li>
                        <li className="list-group-item">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" defaultChecked={reccuringrule.until !== undefined ? true : false} name="exampleRadios" id="exampleRadios2" value="option2" />
                            <div className="form-check-label flexLabel" htmlFor="exampleRadios2">
                              Run until a specific date
                        
                              <input className="form-control datepicker" id="datepickerRun" placeholder="DD-MM-YYYY"
                                onChange={(e) => setReccuringrule({ ...reccuringrule, ["until"]: e.target.value })}
                                style={{ "width": "140px", "height": "30px" }} defaultValue={reccuringrule.until} />

                            </div>


                          </div>
                          <ul style={{ "padding-left": "18px" }}>
                            <li>The event will run until it reaches a specific date</li>
                          </ul>
                        </li>
                        <li className="list-group-item">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" defaultChecked={reccuringrule.count > 0 ? true : false} name="exampleRadios" id="exampleRadios3" value="option3" />
                            <div className="form-check-label flexLabel" htmlFor="exampleRadios3">
                              Run until it reaches
                              <input type="text" className="form-control" placeholder="1" style={{ "width": "45px" }}
                                defaultValue={reccuringrule.count}
                                onChange={(e) => setReccuringrule({ ...reccuringrule, ["count"]: e.target.value })} /> occurrences
                            </div>
                          </div>
                          <ul style={{ "padding-left": "18px" }}>
                            <li>The event will repeat until it reaches a certain amount of occurrences</li>
                          </ul>
                        </li>
                      </ul>
                      <hr />

                    </div>
                  </div> : null
          }
        </Modal.Body>
        <Modal.Footer>
          <div className="button-Div tabBottomBtn">
            <div className="rightAlign rightBtnGroup">
              <button className="btn_cancel reset_button" onClick={() => setShow5(false)} type="button" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn_save crt_btn edit_btn"
                onClick={() => (setShow5(false),
                  setIsrecurr(true),
                  setReccuringruleSave(reccuringrule),
                  reccuringtime === "monthly" ?
                    setRuleshow(
                      "Recurring " + reccuringtime + ";" +
                      "Day " + (reccuringrule.day || '') + ";" +
                      "interval " + (reccuringrule.interval || '') + ";" +
                      (reccuringrule.until !== undefined ? ("until " + reccuringrule.until) : ("occurences " + (reccuringrule.count || '')))
                    ) : reccuringtime === "weekly" ?
                      setRuleshow(
                        "Recurring " + reccuringtime + ";" +
                        "weekDays " + (reccuringrule.weekDays || '') + ";" +
                        "interval " + (reccuringrule.interval || '') + ";" +
                        (reccuringrule.until !== undefined ? ("until " + reccuringrule.until) : ("occurences " + (reccuringrule.count || '')))
                      ) :
                      setRuleshow(
                        "Recurring " + reccuringtime + ";" +
                        "interval " + (reccuringrule.interval || '') + ";" +
                        (reccuringrule.until !== undefined ? ("until " + reccuringrule.until) : ("occurences " + (reccuringrule.count || '')))
                      )
                )}>Save Changes</button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
}
export default RecurringModal;