<?php

namespace App\Filament\Resources\Orderecoms\Pages;

use App\Filament\Resources\Orderecoms\OrderecomResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOrderecoms extends ListRecords
{
    protected static string $resource = OrderecomResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
