import { Drawer } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoMdClose } from 'react-icons/io';
import './style.scss';
import { Trans } from 'react-i18next';

/**
 * CreateEventSlider function.
 *
 * @param {object} props - the props object containing show and handleClose properties
 * @return {JSX.Element} the Offcanvas component
 */
const CreateEventSlider = (props) => {
    // Destructure show and handleClose from props
    const { show, handleClose } = props;

    // Return the Offcanvas component with show, onHide, and placement props
    return (
        <Drawer anchor="right" open={show} onClose={handleClose}>
            <div className="drawer-content drawer-boxSize">

                <div className="row">
                    <div className="col-6">
                        <h3 class="page_heading">Create Event</h3>
                    </div>
                    <div className="col-6">
                        <i onClick={handleClose} className="closeButton">
                            <IoMdClose style={{ width: '24px', height: '24px' }} />
                        </i>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 bnds">
                        <div className="sortWrap">
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography><Trans>Event Information</Trans></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Trans>Event Information</Trans>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography>
                                        <Trans>Event Date and Time</Trans></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>Event Date and Time</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}
export default CreateEventSlider;