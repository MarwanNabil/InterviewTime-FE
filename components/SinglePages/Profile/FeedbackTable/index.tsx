import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//Helpers
import { DB, NA, PS, Architecture, HR, InterviewFeedbackI, ReactionE, getReactionComponent } from '@helpers/index';
import Stack from '@mui/material/Stack';

function createData(data: InterviewFeedbackI) {
    return data;
}

const dumbFeedbackData: Array<InterviewFeedbackI> = [];
dumbFeedbackData.push({ id: '0', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '1', date: new Date(), feedbackTitle: 'The best one.', interviewType: PS, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '2', date: new Date(), feedbackTitle: 'The best one.', interviewType: HR, overallRating: ReactionE.VeryDissatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '3', date: new Date(), feedbackTitle: 'The best one.', interviewType: NA, overallRating: ReactionE.VerySatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '5', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '6', date: new Date(), feedbackTitle: 'The best one.', interviewType: Architecture, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '7', date: new Date(), feedbackTitle: 'The best one.', interviewType: NA, overallRating: ReactionE.VerySatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '8', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '9', date: new Date(), feedbackTitle: 'The best one.', interviewType: Architecture, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '10', date: new Date(), feedbackTitle: 'The best one.', interviewType: NA, overallRating: ReactionE.VerySatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '11', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '12', date: new Date(), feedbackTitle: 'The best one.', interviewType: Architecture, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '13', date: new Date(), feedbackTitle: 'The best one.', interviewType: NA, overallRating: ReactionE.VerySatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '14', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '15', date: new Date(), feedbackTitle: 'The best one.', interviewType: Architecture, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '16', date: new Date(), feedbackTitle: 'The best one.', interviewType: NA, overallRating: ReactionE.VerySatisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '17', date: new Date(), feedbackTitle: 'The best one.', interviewType: DB, overallRating: ReactionE.Satisfied, detailedFeedback: 'need to improve his accent a little bit.' })
dumbFeedbackData.push({ id: '18', date: new Date(), feedbackTitle: 'The best one.', interviewType: Architecture, overallRating: ReactionE.Neutral, detailedFeedback: 'need to improve his accent a little bit.' })

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: '#f5f5f5' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.date.toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{row.interviewType.name}</TableCell>
                <TableCell align="left">{row.feedbackTitle}</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right">{getReactionComponent(row.overallRating)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#f5f5f5' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" gutterBottom component="div">
                                {/* Details */}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Profile</TableCell>
                                        <TableCell align="left">Detailed Feedback</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key={row.id}>
                                        <TableCell align="left">{'Link'}</TableCell>
                                        <TableCell align="left">{row.detailedFeedback}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                aria-label="Disabled elevation buttons"

                                            >
                                                <Button color='success'>Accept</Button>
                                                <Button color='error'>Reject</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function FeedbackTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Stack sx={{
            maxWidth: 1500,
            display: "flex", flexDirection: 'column', alignItems: 'center',
            paddingTop: 5, paddingBottom: 20, paddingX: 2,

        }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 550
                        }}>
                            <TableCell />
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Date</TableCell>
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Type</TableCell>
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Feedback</TableCell>
                            <TableCell align="right" sx={{ color: 'inherit', fontWeight: 'inherit' }}></TableCell>
                            <TableCell align="right" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Overall</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dumbFeedbackData.filter((row, i) => (rowsPerPage * page <= i && i < rowsPerPage * (page + 1))).map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={dumbFeedbackData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>

        </Stack >
    );
}
