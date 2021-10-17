<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class TasksController extends Controller {
    public $taskRepository;

    public function __construct( TaskRepository $taskRepository ) {
        $this->taskRepository = $taskRepository;
    }

    /**
     * index() Get all project
     *
     * @return response
     */
    public function index() {
        $tasks = $this->taskRepository->getAll();
        return response()->json( [
            'success' => true,
            'message' => 'Tasks List',
            'data'    => $tasks,
        ] );
    }

    /**
     * show() Find project by Id
     *
     * @param integer $id
     * @return response
     */
    public function show( $id ) {
        $task = $this->taskRepository->findById( $id );
        if ( is_null( $task ) ) {
            return response()->json( [
                'success' => false,
                'message' => 'Task Details',
                'data'    => null,
            ] );
        }
        return response()->json( [
            'success' => true,
            'message' => 'Task Details',
            'data'    => $task,
        ] );
    }

    /**
     * creat() Created new project
     *
     * @param Request $request
     * @return response
     */
    public function store( Request $request ) {
        $formData  = $request->all();
        $validator = FacadesValidator::make( $formData, [
            'name'        => 'required',
            'description' => 'required',
            'project_id'  => 'required',
        ], [
            'name.required'    => 'Please give project name',
            'name.description' => 'Please give project description',
        ] );

        if ( $validator->fails() ) {
            return response()->json( [
                'success' => false,
                // 'message' => $validator->getMessageBag()->first(),
                'errors'  => $validator->getMessageBag(),
            ] );
        }

        $task = $this->taskRepository->create( $request );
        return response()->json( [
            'success' => true,
            'message' => 'Task Stored',
            'data'    => $task,
        ] );
    }

    /**
     * update() Updated project by Id
     *
     * @param Request $request
     * @param integer $id
     * @return response
     */
    public function update( Request $request, $id ) {
        $task = $this->taskRepository->findById( $id );
        if ( is_null( $task ) ) {
            return response()->json( [
                'success' => false,
                'message' => 'Task Not Found',
                'data'    => null,
            ] );
        }
        $formData  = $request->all();
        $validator = FacadesValidator::make( $formData, [
            'name'        => 'required',
            'description' => 'required',
            'project_id'  => 'required',
        ], [
            'name.required'    => 'Please give Task name',
            'name.description' => 'Please give Task description',
        ] );

        if ( $validator->fails() ) {
            return response()->json( [
                'success' => false,
                // 'message' => $validator->getMessageBag()->first(),
                'errors'  => $validator->getMessageBag(),
            ] );
        }

        $task = $this->taskRepository->edit( $request, $id );
        return response()->json( [
            'success' => true,
            'message' => 'Task Updated',
            'data'    => $task,
        ] );
    }

    /**
     * delete() Delete project by Id
     *
     * @param integer $id
     * @return response
     */
    public function destroy( $id ) {
        $task = $this->taskRepository->findById( $id );
        if ( is_null( $task ) ) {
            return response()->json( [
                'success' => false,
                'message' => 'Task Not Found',
                'data'    => null,
            ] );
        }

        $task = $this->taskRepository->delete( $id );
        return response()->json( [
            'success' => true,
            'message' => 'Task Deleted',
            'data'    => $task,
        ] );
    }
}
