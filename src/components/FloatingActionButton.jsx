import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import RoomIcon from '@material-ui/icons/Room';
const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
}));
export default function FAB() {
    const classes = useStyles();
    return (
        <Fab color="primary" aria-label="add" className={classes.fab} variant="extended">
            <RoomIcon className={classes.extendedIcon}/>
            Locate Me
        </Fab>
    );
}