<?php

namespace App\Filament\Resources\Categoryecoms\Pages;

use App\Filament\Resources\Categoryecoms\CategoryecomResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCategoryecom extends EditRecord
{
    protected static string $resource = CategoryecomResource::class;

    
    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
