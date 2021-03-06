import { 
    Drawer, 
    AppBar, 
    Toolbar, 
    List, 
    CssBaseline, 
    Typography, 
    Divider, 
    IconButton, 
    ListItem, 
    ListItemIcon, 
    ListItemText 
} from '@material-ui/core';
import { Inbox, Mail, Menu, ChevronLeft, ChevronRight } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from '../../styles/mainLayoutStyles';

const MainLayout = ({menu, setMenu, children, handleDrawerOpen, handleDrawerClose, open}) => {
    const classes = makeStyles(styles)();
    const theme = useTheme();
    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {menu.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link to="/"><h4>jinsu's workspace</h4></Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <Link to={text} onClick={() => setMenu({name: text, link: text})}>
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
    )
}

export default MainLayout