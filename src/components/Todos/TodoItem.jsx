import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, Close, Done } from '@material-ui/icons'
import { 
  ListItemIcon, 
  ListItemSecondaryAction, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  ListItem,
  TextField
} from '@material-ui/core';

import { useDispatch } from 'react-redux'
import { completeTodo, deleteTodo, updateTodo } from '../../flux/actions/todosActions';

const useStyles = makeStyles({
    secondaryButton: {
      marginRight: 0,
    },
    textItem: {
        maxWidth: 140,
        marginRight: 60
    },
    editTextItem: {
        maxWidth: 140,
        marginRight: 70,
        marginLeft: 10
    },
    completedItem: {
        textDecoration: "line-through",
        maxWidth: 140,
        marginRight: 60
    },
    cancelEdit: {
        marginLeft: -13
    }
})

export default function TodoItem({ id, value, completed, todos, date, listId, setErrorMessage, loading }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [ editMode, setEditMode ] = useState(false)

    const [ newItemToAdd, setNewItem ] = useState(value) 

    useEffect(() => {
        setNewItem(value)
    }, [value])

    useEffect(() => {
        setErrorMessage({ name: "", status: false})
    }, [newItemToAdd, setErrorMessage])

    function handleEditItem(e) {
        e.preventDefault()

        function checkIfItemIsIn(item, list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === item) {
                    return true
                }
            }
            return false
        }

        if (checkIfItemIsIn(newItemToAdd, todos)) {
            return setErrorMessage({ name: "You already have the same task. Try another variant!", status: true })
        }

        if (newItemToAdd.length > 0) {
            dispatch(updateTodo(newItemToAdd, id, listId))
        }

        setNewItem("")
        setEditMode(false)
    }

    return (
        <>
            { !editMode ?
                <ListItem key={id}>
                
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            color="primary"
                            aria-label="Complete todo"
                            checked={completed}
                            onChange={() => dispatch(completeTodo(id, listId))}
                            disableRipple
                        />
                    </ListItemIcon>

                    <ListItemText 
                        primary={value} 
                        secondary={"From " + date.slice(8, 10) + "/" + date.slice(5, 7)} 
                        className={completed ? classes.completedItem : classes.textItem}
                    /> 

                    <ListItemSecondaryAction>
                        {!completed && 
                        <IconButton 
                            onClick={() => setEditMode(!editMode)} 
                            edge="end" 
                            aria-label="Edit todo"
                            className={classes.secondaryButton}
                        >
                            <Edit />
                        </IconButton>}
                        
                        <IconButton 
                            disabled={loading}
                            onClick={() => {
                                dispatch(deleteTodo(id, listId))
                            }} 
                            edge="end" 
                            aria-label="Delete todo"
                            color="primary"
                            >
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            
            :
            
                <ListItem key={id}>

                    <ListItemIcon className={classes.cancelEdit}>
                        <IconButton onClick={() => setEditMode(!editMode)}>
                            <Close
                                edge="start"
                                color="default"
                                aria-label="Close edit mode"
                            />
                        </IconButton>
                    </ListItemIcon> 

                    <form onSubmit={handleEditItem}>
                        <ListItemText className={classes.editTextItem}>
                            <TextField
                                value={newItemToAdd}
                                onChange={(e) => setNewItem(e.target.value)}
                                type="text"
                            />
                        </ListItemText>

                        <ListItemSecondaryAction>
                            <IconButton 
                                aria-label="Submit edited todo"
                                type="submit" 
                                edge="end" 
                                color="primary" 
                                disabled={newItemToAdd.length === 0 || newItemToAdd === value}
                            >
                                <Done />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </form>
                </ListItem> }
    </>
    )
}